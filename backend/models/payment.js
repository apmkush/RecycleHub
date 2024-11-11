import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  orderId: String,
  paymentId: String,
  signature: String,
  amount: Number,
  status: { type: String, enum: ['created', 'successful', 'failed'], default: 'created' },
  createdAt: { type: Date, default: Date.now },
});

export const PaymentModel = mongoose.model('Payment', PaymentSchema);
