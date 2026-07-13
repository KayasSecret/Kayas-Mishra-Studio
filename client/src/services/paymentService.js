const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/payment"
    : "https://kayas-mishra-studio.onrender.com/api/payment";
/**
 * Calls backend to create a Razorpay order.
 * @param {Object} paymentData - { amount, currency, bookName, customerName, email, phone }
 */
export async function createOrder(paymentData) {
  try {
    const response = await fetch(`${API_BASE}/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Failed to initialize payment order.');
    }
    return data; // Returns order_id, amount, currency, key_id
  } catch (error) {
    console.error('Payment Service createOrder error:', error);
    throw error;
  }
}

/**
 * Calls backend to verify signature and finalize payment.
 * @param {Object} verificationData - { razorpay_order_id, razorpay_payment_id, razorpay_signature }
 */
export async function verifyPayment(verificationData) {
  try {
    const response = await fetch(`${API_BASE}/verify-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(verificationData),
    });

    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Payment verification failed.');
    }
    return data;
  } catch (error) {
    console.error('Payment Service verifyPayment error:', error);
    throw error;
  }
}
