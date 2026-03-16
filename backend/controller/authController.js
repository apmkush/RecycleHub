import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcryptjs";
import axios from "axios";
import crypto from "crypto";
import { validationResult } from "express-validator";
import nodemailer from "nodemailer";
import {UserModel} from "../models/user.js";
import { OTPModel } from "../models/otp.js";
import { generateToken, verifyToken, generateTempToken } from "../config/secret.js";
import { OAuth2Client } from "google-auth-library";
import { uploadToCloudinary } from "../config/cloudinary.js";

export const login = async (req, res) => {
    const data={
        email:req.body.email,
        password:req.body.password,
    };
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    console.log(data);
    try{
        const check = await UserModel.findOne({email:req.body.email});
        
        if(!check){
            return res.json({success:false,message:"user cannot be found"});
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password,check.password);
        if(isPasswordMatch){
            const authToken = generateToken(check.id);
            res.json({success:true,message:"Login successful!!",token:authToken,user:check});
            console.log("Login successful");
        }else{
            res.json({success:false,message:"wrong password!!"});
            console.log("wrong password");
        }
    }catch(error){
        console.log(error);
        res.json({success:false,message:"wrong details"});
    }
};

export const signup = async (req, res) => {
  const data = {
    name:req.body.name,
    email:req.body.email,
    phone:req.body.phone,
    password:req.body.password,
    confirm_password:req.body.confirm_password,
    userRole:req.body.role,
  };
    console.log(data);
    try{
        const existingUser = await UserModel.findOne({email: data.email});
        if(data.password!=data.confirm_password){
      return res.json({success:false,message:"Passwords does not match!!"});
        }
        else if(existingUser){
      return res.json({success:false,message:"User already exists.Please enter different email"});
        }else{
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(data.password,saltRounds);
      const userdata = await UserModel.create({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
        userRole: data.userRole,
      });
            // const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
            console.log(userdata);
            const authToken = generateToken(userdata.id);
      return res.json({success:true,message:"Singup successful!!",token:authToken});
        }
    }catch(e){
        console.log(e);
    return res.json({success:false,message:"Something went wrong!!"});
    }
  };


//Authenticate the email id and password from which mail will be sent
const mailUser = process.env.MAIL_USER || process.env.EMAIL || process.env.email;
const mailPass = process.env.MAIL_PASS || process.env.EMAIL_PASSWORD || process.env.PASSWORD || process.env.password;

var transporter = nodemailer.createTransport({
    //service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: mailUser,
      pass: mailPass,
    },
  });

  const generateOTP = async (email) => {
    const OTP = Math.floor(100000 + Math.random() * 900000);
    await OTPModel.deleteMany({ email });
    await OTPModel.create({ email, otp: OTP.toString() });
    console.log(`Generated OTP for ${email}: ${OTP}`);
    return OTP;
  };

  export const sendotp = async (req, res) => {
    const email = req.body.email;
    console.log(email);
    try {
      //check if an account is accossiated with entered email id
      const oldUser = await UserModel.findOne({email});
      if (!oldUser) {
        return res.json({
          message: "Invalid email id",
          success: false,
        });
      }else{
        console.log(oldUser.name);
      }
  
      //generate otp
      const generatedOtp = await generateOTP(email);
  
      //The mail content to be sent to user
      var mailOptions = {
        from: `RecycleHub <${mailUser}>`,
        to: `${email}`,
        subject: "Password Reset",
        text: `Dear User,
  
        You have requested to reset your password. Otp for password reset is below:
        
        ${generatedOtp}
        
        Do not share otp with anyone.
        
        Regards,
        Web Team,
        RecycleHub`,
      };
  
      //Function to send mail   
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
          return res.json({
            message: "Something went wrong",
            success: false,
          });
        } else {
          //console.log(link);
          return res.json({
            message: "OTP sent to your email",
            success: true,
          });
        }
      });
    } catch (error) {
        console.log(error);
        return res.json({
          message: "Something went wrong",
          success: false,
        });
    }
  };

export const verifyotp=async (req, res) => {
    try{
      const { email, otp } = req.body;
      const otpRecord = await OTPModel.findOne({ email });

      if (!otpRecord) {
          return res.json({ success: false, message: "OTP not found or expired" });
      }
      
      if (otp === otpRecord.otp) {
          await OTPModel.deleteOne({ _id: otpRecord._id });
          console.log("OTP verified successfully");
          return res.json({ success: true, message: "OTP verified successfully" });
      } else {
          return res.json({ success: false, message: "Invalid OTP" });
      }
    }catch(e){
      console.log(e);
      return res.json({ success: false, message: "Something went wrong" });
    }
}

export const resetPassword = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await UserModel.findOne({ email });
      
      if (!user) {
        return res.json({ success: false, message: "Email not found" });
      }

      // Hash the new password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Update the user's password
      user.password = hashedPassword;
      await user.save();
  
      return res.json({ message: "Password reset successfully" });
    } catch (error) {
      console.log(error);
      return res.json({ message: "Internal server error" });
    }
  };

export const getData = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from the decoded token in authMiddleware

    const user = await UserModel.findById(userId).select("-password"); // Exclude password
    // console.log(user);
    if (!user) return res.status(404).json({success:false, message: 'User not found' });
    
    res.json({success:true,user:user});
  } catch (error) {
    res.json({success:false, message: 'Server error' });
  }
}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
export const googleLogin = async (req, res) =>{
  
  try {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(400).json({ success: false, message: "Token missing" });
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7);
    }

    // Verify token using Google's API
    // const googleResponse = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);
    // const { email, name, picture, sub } = googleResponse.data; // Extract user info

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID, // Must match the frontend client ID
    });

    const { email, name, picture, sub } = ticket.getPayload();
    // console.log(email);

    if (!email) {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }

    // Check if user exists in the database
    let user = await UserModel.findOne({ email });

    if (!user) {
      const randomPassword = crypto.randomBytes(32).toString("hex");
      const hashedPassword = await bcrypt.hash(randomPassword, 10);
      user = await UserModel.create({
        name: name || email.split("@")[0],
        email,
        password: hashedPassword,
        phone: 0,
        profileImage: picture || "",
        userRole: "customer",
      });
    }

    const sanitizedUser = user.toObject ? user.toObject() : user;
    delete sanitizedUser.password;
    const authToken = generateToken(user.id);
    // Generate a new session token (optional, if you want to maintain session-based auth)
    return res.json({ success: true, user:sanitizedUser,token:authToken });

  } catch (error) {
      console.error("Google Auth Error:", error);
      return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
}


export const updateData = async (req, res) => {
  const { name, email, phone, address, age, profileImage, addresses } = req.body;
  const UserId = req.user.id;
  // console.log("Profile image",req.body);
  try {
    const updateObj = { name, email, phone, address, age, profileImage };
    if (addresses) {
      updateObj.addresses = addresses;
    }
    const user = await UserModel.findByIdAndUpdate(
      UserId,
      updateObj,
      { new: true }
    );
    console.log(user);
    return res.json({ success: true, user:user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.json({ success: false, message: 'Server error' });
  }

}

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const user = await UserModel.findById(req.user.id);
    if (!user) return res.json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.json({ message: 'Current password is incorrect' });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.json({ message: 'Error changing password', error });
  }
};

// Update Preferences (Dark Mode, Language)
export const updateMode = async (req, res) => {
  const { dark } = req.body;

  try {
    const user = await UserModel.findByIdAndUpdate(
      req.user.id,
      { dark },
      { new: true }
    );
    res.json({ message: 'Preferences updated successfully', user });
  } catch (error) {
    res.json({ message: 'Error updating preferences', error });
  }
};

// Upload Profile Photo to Cloudinary
export const uploadProfilePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({ success: false, message: 'No file uploaded' });
    }

    const userId = req.user.id;
    const user = await UserModel.findById(userId);
    
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    // Upload to Cloudinary
    const result = await uploadToCloudinary(
      req.file.buffer,
      `${user.email}-profile`
    );

    // Update user with new profile image URL
    user.profileImage = result.secure_url;
    await user.save();

    res.json({
      success: true,
      message: 'Profile photo updated successfully',
      profileImage: result.secure_url,
      user: user
    });
  } catch (error) {
    console.error('Error uploading profile photo:', error);
    res.json({ success: false, message: 'Error uploading profile photo', error: error.message });
  }
};

