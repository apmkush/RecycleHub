import { Schema, model } from 'mongoose';

const SubscriptionSchema = new Schema({
  razorpay_subscription_id: {
    type: String,
    required: true,
    unique: true,
  },
  customer_id: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Assuming there's a Dealer model for users who create subscriptions
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SubscriptionModel = model('Subscription', SubscriptionSchema);
export {SubscriptionModel};
