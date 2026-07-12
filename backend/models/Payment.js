const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  bookName: {
    type: String,
    required: true,
    trim: true
  },
  bookPrice: {
    type: Number,
    required: true
  },
  razorpayOrderId: {
    type: String,
    required: true,
    unique: true
  },
  razorpayPaymentId: {
    type: String,
    sparse: true // Allows null initially until verification succeeds
  },
  status: {
    type: String,
    enum: ['created', 'captured', 'failed', 'verified'],
    default: 'created'
  },
  currency: {
    type: String,
    default: 'INR'
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Payment', PaymentSchema);
