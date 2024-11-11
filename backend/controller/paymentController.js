import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from "dotenv";
dotenv.config();
import {PaymentModel} from '../models/payment.js';

const razorpayInstance = new Razorpay({
  key_id: process.env.REACT_APP_RAZORPAY_KEY_ID,
  key_secret: process.env.REACT_APP_RAZORPAY_SECRET,
});

// Generate a new order
export const createOrder = async (req, res) => {
  const { amount } = req.body;
  const options = {
    amount: amount * 100, // Amount in paise
    currency: 'INR',
    receipt: `receipt_order_${Date.now()}`,
  };
  try {
    const order = await razorpayInstance.orders.create(options);
    const newPayment = new PaymentModel({
      orderId: order.id,
      amount,
    });
    await newPayment.save();
    res.json({ orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (error) {
    console.error('Error creating order:', error);
    res.json({ error: 'Error creating Razorpay order' });
  }
};

// Verify payment
export const verifyPayment = async (req, res) => {
    const { orderId, paymentId, signature } = req.body;
  
    const body = orderId + "|" + paymentId;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.REACT_APP_RAZORPAY_SECRET)
      .update(body.toString())
      .digest('hex');
  
    if (expectedSignature === signature) {
      await PaymentModel.updateOne({ orderId }, { paymentId, signature, status: 'successful' });
      res.json({ success: true, message: 'Payment verified successfully' });
    } else {
      await PaymentModel.updateOne({ orderId }, { status: 'failed' });
      res.json({ success: false, message: 'Payment verification failed' });
    }
  };