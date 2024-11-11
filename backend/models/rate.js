import mongoose from "mongoose";

const ScrapItemSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true,
    },
    material: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

const RateModel=mongoose.model("Rate",ScrapItemSchema);
export {RateModel};