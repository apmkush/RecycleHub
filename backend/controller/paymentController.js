import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from "dotenv";
dotenv.config();
import {PaymentModel} from '../models/payment.js';

const razorpayInstance = new Razorpay({
  key_id: process.env.REACT_APP_RAZORPAY_KEY_ID,
  key_secret: process.env.REACT_APP_RAZORPAY_SECRET,
});

// console.log(razorpayInstance); // To check if razorpay instance is initialized properly
// console.log(razorpayInstance.payouts); // To verify if payouts API is accessible

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

  export const payout = async (req, res) => {
        const { account_number, ifsc_code, amount } = req.body;

    // Validate input
    // if (!account_number || !ifsc_code || !amount) {
    //     return res.status(400).json({ message: 'Missing required fields' });
    // }

    const payoutData = {
        account_number,
        ifsc_code,
        amount: amount * 100, // Razorpay works in smallest unit (e.g., paise)
        currency: 'INR',
        purpose: 'Refund'
    };

    try {
        // Create a payout
        console.log('Payout Data:', payoutData);
        const payoutResponse = await razorpayInstance.transfers.create(payoutData);
        res.json({ message: 'Payout initiated successfully', payoutResponse });
    }catch (err) {
        console.error(err);
        res.json({ message: 'Payout failed', error: err.message });
    }
}
