import { text } from "express";
import mongoose from "mongoose";
const connect=mongoose.connect("mongodb://localhost:27017/VidyaSetu");

connect.then(()=>{
    console.log("Database connected succcessfully");
})
.catch(()=>{
    console.log("Database not connected");
});

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true
    },
    password: {
        type: String,
        required: true
    },
});

const rateSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true    
    },
    rate:{
        type:Number,
        require:true
    },
});

const pickupScheduleSchema = new mongoose.Schema({
  item: {
    type: String, 
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pickupDate: {
    type: Date,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['scheduled', 'picked up', 'canceled'],
    default: 'scheduled',
  },
  phone: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserModel=mongoose.model("User",userSchema);
const RateModel=mongoose.model("Rate",userSchema);
const PickupModel=mongoose.model("Pickup",userSchema);

export{UserModel,RateModel,PickupModel};