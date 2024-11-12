import mongoose from "mongoose";

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
    regno:{
        type:Number,
        require:true,
        min:0
    },
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