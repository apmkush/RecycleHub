import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from "dotenv";
dotenv.config();

import {SubscriptionModel} from '../models/subscription.js';

const razorpayKeyId = process.env.RAZORPAY_KEY_ID || process.env.REACT_APP_RAZORPAY_KEY_ID;
const razorpaySecret = process.env.RAZORPAY_SECRET || process.env.REACT_APP_RAZORPAY_SECRET;

const razorpayInstance = new Razorpay({
  key_id: razorpayKeyId,
  key_secret: razorpaySecret,
});


// Generate a new order
export const createOrder = async (req, res) => {
  // console.log(req.body);
  try {
    const subscription = await razorpayInstance.subscriptions.create({
        plan_id: req.body.plan_id, // Replace with your actual plan ID
        customer_notify: 0,
        total_count: 6,
    });

    res.json({subscription:subscription });
    } catch (error) {
        console.error('Error creating subscription link:', error);
        res.json({ message: 'Failed to create subscription link', error: error.message });
    }
};


// Verify payment
export const verifyPayment = async (req, res) => {
    const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } = req.body;
    const customerId = req.user.id;
    const secret = razorpaySecret;
    if (!secret) {
      return res.status(500).json({ success: false, message: 'Razorpay secret is not configured' });
    }
    console.log('customer_id:',customerId);
    const generated_signature = crypto
      .createHmac('sha256', secret)
      .update(razorpay_payment_id + '|' + razorpay_subscription_id)
      .digest('hex');
    if (generated_signature === razorpay_signature) {
      try {
        const newSubscription = new SubscriptionModel({
          razorpay_subscription_id,
          customer_id:customerId,
        });
    
        const savedSubscription = await newSubscription.save();
        console.log('Subscription saved:', savedSubscription);
      } catch (error) {
        console.error('Error saving subscription:', error);
      }
      res.json({ success: true, message: 'Payment verified' });
    } else {
      // console.log('razorpay_subscription_id:', razorpay_subscription_id);
      // console.log('razorpay_payment_id:', razorpay_payment_id);

      res.json({ success: false, message: 'Payment verification failed' });
      console.log ('Payment verification failed');
    }
  };


  // Fetch subscription details
  export const fetchSubscriptions = async (req, res) => {
    try {
      const userId = req.user.id;
      const subscriptionRecord = await SubscriptionModel.findOne({ customer_id: userId }).sort({ createdAt: -1 });

      if (!subscriptionRecord) {
        return res.json([]);
      }

      const subscription = await razorpayInstance.subscriptions.fetch(subscriptionRecord.razorpay_subscription_id);
      return res.json(subscription ? [subscription] : []);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      return res.json([]);
    }
  };



  export const fetchPlans = async (req, res) => {
    try {
      const plans = await razorpayInstance.plans.all();
      console.log('All Plans:', plans.items);
      res.json(plans.items);
    } catch (error) {
      console.error('Error fetching plans:', error);
      res.status(500).json({ error: 'Failed to fetch plans' });
    }
  }

