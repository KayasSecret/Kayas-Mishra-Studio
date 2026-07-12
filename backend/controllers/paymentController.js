const crypto = require('crypto');
const razorpay = require('../config/razorpay');
const Payment = require('../models/Payment');

/**
 * Creates a Razorpay order and stores a pending payment session in MongoDB.
 */
exports.createOrder = async (req, res, next) => {
  try {
    const { amount, currency, bookName, customerName, email, phone } = req.body;

    if (!amount || !bookName || !customerName || !email || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameters: amount, bookName, customerName, email, and phone are required.'
      });
    }

    // Razorpay amount is in paise (e.g., 29 INR = 2900 paise)
    const orderOptions = {
      amount: Math.round(amount * 100),
      currency: currency || 'INR',
      receipt: `receipt_order_${Date.now()}`,
    };

    // 1. Create order on Razorpay
    const order = await razorpay.orders.create(orderOptions);

    if (!order) {
      return res.status(500).json({
        success: false,
        error: 'Failed to create order on Razorpay servers.'
      });
    }

    // 2. Save pending transaction record to MongoDB
    const newPayment = new Payment({
      customerName,
      email,
      phone,
      bookName,
      bookPrice: amount,
      razorpayOrderId: order.id,
      status: 'created',
      currency: order.currency,
    });

    await newPayment.save();

    // 3. Return order details to frontend
    return res.status(200).json({
      success: true,
      order_id: order.id,
      amount: order.amount, // in paise
      currency: order.currency,
      key_id: process.env.RAZORPAY_KEY_ID
    });

  } catch (error) {
    console.error('Create Order Error:', error);
    next(error);
  }
};

/**
 * Verifies Razorpay payment signature and updates transaction status to verified in MongoDB.
 */
exports.verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        error: 'Verification payload requires razorpay_order_id, razorpay_payment_id, and razorpay_signature.'
      });
    }

    // 1. Generate local signature to compare
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(text)
      .digest('hex');

    // 2. Compare signatures
    if (generatedSignature !== razorpay_signature) {
      // Find and update the record to failed
      await Payment.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { status: 'failed', razorpayPaymentId: razorpay_payment_id }
      );

      return res.status(400).json({
        success: false,
        error: 'Payment verification failed: invalid signature.'
      });
    }

    // 3. Update payment status to verified on successful verification
    const verifiedPayment = await Payment.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      { 
        status: 'verified', 
        razorpayPaymentId: razorpay_payment_id 
      },
      { new: true }
    );

    if (!verifiedPayment) {
      return res.status(404).json({
        success: false,
        error: 'Order record not found in database.'
      });
    }

    // 4. Trigger automated e-book email delivery asynchronously
    // Failures are caught inside the service so they don't break the client response
    const emailService = require('../services/emailService');
    emailService.sendBookDeliveryEmail(
      verifiedPayment.customerName,
      verifiedPayment.email,
      verifiedPayment.razorpayOrderId
    );

    return res.status(200).json({
      success: true,
      message: 'Payment verified successfully and saved.',
      payment: verifiedPayment
    });

  } catch (error) {
    console.error('Verify Payment Error:', error);
    next(error);
  }
};
