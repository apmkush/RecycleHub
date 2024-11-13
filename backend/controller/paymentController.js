import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from "dotenv";
dotenv.config();
import {SubscriptionModel} from '../models/subscription.js';

const razorpayInstance = new Razorpay({
  key_id: process.env.REACT_APP_RAZORPAY_KEY_ID,
  key_secret: process.env.REACT_APP_RAZORPAY_SECRET,
});

// console.log(razorpayInstance);
// console.log(razorpayInstance.payouts);

// Generate a new order
export const createOrder = async (req, res) => {
  try {
    const subscription = await razorpayInstance.subscriptions.create({
        plan_id: "plan_PKPBib2XkNce96", // Replace with your actual plan ID
        customer_notify: 0,
        total_count: 6,
    });
    // console.log('Subscription:', subscription);
    const plan = await razorpayInstance.plans.fetch(subscription.plan_id);
        // console.log('Plan:', plan);
        if (!plan || !plan.item.amount || !plan.item.currency) {
            throw new Error('Plan amount or currency is missing');
        }
        const amount = plan.item.amount;         // The amount in paise (10000 means ₹100.00)
        const currency = plan.item.currency;     // Currency code (INR)

        // Log the amount and currency to check their values
        console.log('Amount:', amount);  // This should show 10000
        console.log('Currency:', currency);

    const subscriptionLink = await razorpayInstance.invoices.create({
        type: "link",
        description: "Subscription payment link",
        customer: {
            name: req.body.name,
            contact: req.body.contact,
            email: req.body.email,
        },
        subscription_id: subscription.id,
        amount: plan.item.amount,
        currency: plan.item.currency,
    });

    // Send the subscription link URL back to the frontend
    res.json({ paymentLink: subscriptionLink.short_url });
    } catch (error) {
        console.error('Error creating subscription link:', error);
        res.json({ message: 'Failed to create subscription link', error: error.message });
    }
};


// Verify payment
export const verifyPayment = async (req, res) => {
    const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } = req.body;
    const secret = process.env.RAZORPAY_KEY_SECRET;

    const generated_signature = crypto
      .createHmac('sha256', secret)
      .update(razorpay_subscription_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (generated_signature === razorpay_signature) {
      res.json({ success: true, message: 'Payment verified' });
    } else {
      res.json({ success: false, message: 'Payment verification failed' });
    }
  };





