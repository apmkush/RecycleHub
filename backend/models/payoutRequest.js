import mongoose from "mongoose";

const payoutRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  accountNumber: {
    type: String,
    required: true,
    trim: true,
  },
  ifscCode: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 1,
  },
  status: {
    type: String,
    enum: ["pending", "processed", "failed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PayoutRequestModel = mongoose.model("PayoutRequest", payoutRequestSchema);
export { PayoutRequestModel };
