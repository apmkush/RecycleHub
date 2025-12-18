import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    street: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    zip: {
        type: String,
        default: ""
    },
    isPrimary: {
        type: Boolean,
        default: false
    }
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
    age:{
        type:Number,
        default:null,
    },
    address:{
        type:String,
        default:"",
    },
    addresses: [addressSchema],
    profileImage:{
        type:String,
        default:"",
    },
    dark:{
        type:Boolean,
        default:false,
    },
    userRole:{
        type: String, 
        enum: ['admin', 'dealer', 'customer'], 
    },
});

const UserModel=mongoose.model("User",userSchema);
export{UserModel};