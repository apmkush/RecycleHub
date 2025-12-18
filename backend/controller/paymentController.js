import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from "dotenv";
dotenv.config();

import {SubscriptionModel} from '../models/subscription.js';

const razorpayInstance = new Razorpay({
  key_id: process.env.REACT_APP_RAZORPAY_KEY_ID,
  key_secret: process.env.REACT_APP_RAZORPAY_SECRET,
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
    const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature,customer_id } = req.body;
    const secret = process.env.REACT_APP_RAZORPAY_SECRET;
    console.log('customer_id:',customer_id);
    const generated_signature = crypto
      .createHmac('sha256', secret)
      .update(razorpay_payment_id + '|' + razorpay_subscription_id)
      .digest('hex');
    if (generated_signature === razorpay_signature) {
      try {
        const newSubscription = new SubscriptionModel({
          razorpay_subscription_id,
          customer_id:customer_id, 
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
    var subscriptionId;
    const { UserId } = req.query;
    console.log(req.query);

    try {
      const subscriptions = await SubscriptionModel.find({customer_id:UserId});
      if (!subscriptions[0]) {
        return res.json([]); // Return empty array if no subscription found
      }
      subscriptionId=subscriptions[0].razorpay_subscription_id;
      // console.log('Subscriptions:', subscriptionId);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      return res.json([]); // Return empty array on error
    }
    try {
      const allSubscriptions = await razorpayInstance.subscriptions.all();
      const subscriptions = allSubscriptions.items.filter(
        (sub) => sub.id === subscriptionId
      );
      console.log('Subscriptions:', subscriptions);
      res.json(subscriptions);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      res.json([]); // Return empty array instead of 500 error
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

