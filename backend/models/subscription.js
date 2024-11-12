import { Schema, model } from 'mongoose';

const SubscriptionSchema = new Schema({
  razorpay_subscription_id: {
    type: String,
    required: true,
    unique: true,
  },
  plan: {
    type: String,
    required: true,
  },
  start_at: {
    type: Date,
    required: true,
  },
  expire_by: {
    type: Date,
  },
  addons: [
    {
      item: {
        name: { type: String },
        amount: { type: Number },
        currency: { type: String },
      },
    },
  ],
  dealer_id: {
    type: Schema.Types.ObjectId,
    ref: 'dealer', // Assuming there's a Dealer model for users who create subscriptions
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'pending', 'completed', 'cancelled'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SubscriptionModel = model('Subscription', SubscriptionSchema);
export {SubscriptionModel};
