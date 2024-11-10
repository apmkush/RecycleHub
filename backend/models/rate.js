import mongoose from "mongoose";

const ScrapItemSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
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
});

const RateModel=mongoose.model("Rate",ScrapItemSchema);

export  {RateModel};