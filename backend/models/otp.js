import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        index: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300, // Auto-delete after 5 minutes (300 seconds)
    },
});

const OTPModel = mongoose.model("OTP", otpSchema);
export { OTPModel };
