import mongoose from "mongoose";

const invoiceItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const invoiceSchema = new mongoose.Schema({
  dealerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  pickupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pickup",
    default: null,
  },
  customer: {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
    },
    address: {
      type: String,
      default: "",
      trim: true,
    },
  },
  items: {
    type: [invoiceItemSchema],
    required: true,
    validate: {
      validator: (arr) => Array.isArray(arr) && arr.length > 0,
      message: "At least one invoice item is required",
    },
  },
  total: {
    type: Number,
    required: true,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const InvoiceModel = mongoose.model("Invoice", invoiceSchema);
export { InvoiceModel };
