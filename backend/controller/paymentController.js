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
            contact: String(req.body.contact),
            email: req.body.email,
        },
        subscription_id: subscription.id,
        amount: plan.item.amount,
        currency: plan.item.currency,
    });

    // Send the subscription link URL back to the frontend
    res.json({ paymentLink: subscriptionLink.short_url,subscription:subscription });
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
      console.log('razorpay_subscription_id:', razorpay_subscription_id);
      console.log('razorpay_payment_id:', razorpay_payment_id);

      res.json({ success: false, message: 'Payment verification failed' });
      console.log ('Payment verification failed');
    }
  };



  // const fetchCustomerByEmailOrContact = async (email, contact) => {
  //   try {
  //     const customers = await razorpayInstance.customers.all();
  //     console.log(email);
  //     const customer = customers.items.find(
  //       (cust) => cust.email === email || cust.contact === contact
  //     );
  //     if (!customer) {
  //       throw new Error('Customer not found');
  //     }
  //     return customer.id;
  //   } catch (error) {
  //     console.error('Error fetching customer:', error);
  //     throw new Error('Failed to fetch customer');
  //   }
  // };

  // Fetch subscription details
  export const fetchSubscriptions = async (req, res) => {
    var subscriptionId;
    const { UserId } = req.query;
    console.log(req.query);

    try {
      const subscriptions = await SubscriptionModel.find({customer_id:UserId});
      subscriptionId=subscriptions[0].razorpay_subscription_id;
      // console.log('Subscriptions:', subscriptionId);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
    try {
      const allSubscriptions = await razorpayInstance.subscriptions.all();

      // Step 3: Filter subscriptions by customer_id locally
      const subscriptions = allSubscriptions.items.filter(
        (sub) => sub.id === subscriptionId
      );
      console.log('Subscriptions:', subscriptions);
      res.json(subscriptions);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      res.status(500).json({ error: 'Failed to fetch subscriptions' });
    }
  };





