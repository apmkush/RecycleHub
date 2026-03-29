import {Pickup} from "../models/pickup.js";
import {UserModel} from "../models/user.js";
import { uploadToCloudinary } from "../config/cloudinary.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();


export const addPickup = async (req, res) => {
    try {
        const {
            item, description, pickupDate, pincode,
            contactNumber, weight, address, email
        } = req.body;
        const RequestedBy = req.user.id;
        let image = "";

        if (req.file) {
            const uploadResult = await uploadToCloudinary(
                req.file.buffer,
                `pickup-${RequestedBy}`,
                'recyclehub/pickups'
            );
            image = uploadResult.secure_url;
        }
        
        const newPickup = new Pickup({
            item,
            description,
            pickupDate,
            pincode,
            contactNumber,
            weight,
            address,
            email,
            image,
            RequestedBy,
        });

        await newPickup.save();
        res.json({success:true, message: 'Pickup created successfully', data: newPickup });
    } catch (error) {
        console.error(error);
        res.json({success:false, message: 'Server error' });
    }
}
export const getPickups = async (req, res) => {
    const userId = req.user.id;
    try{
        const user = await UserModel.findById(userId).select("userRole");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!["admin", "dealer"].includes(user.userRole)) {
            return res.status(403).json({ success: false, message: "Access denied" });
        }

        const data = await Pickup.find();
        res.json(data);
    }catch(e){
        console.log(e);
        res.json({ message: 'Error fetching scrap items' });
    }
}
export const getOrders = async (req, res) => {
    const userId = req.user.id;
    try{
        const data = await Pickup.find({ RequestedBy: userId });
        // console.log(data);
        res.json(data);
    }catch(e){
        console.log(e);
        res.json({ message: 'Error fetching scrap items' });
    }
}
export const getTransactions = async (req, res) => {
    const userId = req.user.id;

    try {
        const relatedPickups = await Pickup.find({
            $or: [{ RequestedBy: userId }, { AcceptedBy: userId }],
        }).sort({ createdAt: -1 });

        const transactions = relatedPickups.map((pickup) => ({
            id: pickup._id.toString(),
            itemLabel: pickup.item,
            itemCount: 1,
            date: new Date(pickup.pickupDate || pickup.createdAt).toISOString().split('T')[0],
            amount: typeof pickup.price === 'number' ? pickup.price : 0,
            status: pickup.status,
        }));

        return res.json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return res.status(500).json({ success: false, message: 'Failed to load transactions' });
    }
}
export const acceptPickup = async (req, res) => {
    try {
        const { requestId, price } = req.body;
        const userId = req.user.id;
        
        // Verify user is admin or dealer
        const user = await UserModel.findById(userId).select("userRole");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        
        if (!["admin", "dealer"].includes(user.userRole)) {
            return res.status(403).json({ success: false, message: "Access denied. Admin or Dealer role required." });
        }
        
        // Find the pickup to get customer email and other details
        const pickup = await Pickup.findById(requestId);
        if (!pickup) {
            return res.status(404).json({ success: false, message: 'Request not found' });
        }

        // Prepare update object
        const updateData = {
            status: 'in-progress',
            AcceptedBy: userId
        };

        // Add price if provided
        if (price !== undefined && price !== null) {
            const parsedPrice = Number(price);
            if (Number.isFinite(parsedPrice) && parsedPrice >= 0) {
                updateData.price = parsedPrice;
            }
        }

        // Find the request by ID and update it
        const updatedRequest = await Pickup.findByIdAndUpdate(
            requestId,
            updateData,
            { new: true, runValidators: true }
        );
    
        if (!updatedRequest) {
            return res.json({ success: false, message: 'Request not found' });
        }
    
        // Send email notification to customer (non-blocking)
        if (pickup.email) {
            sendPickupAcceptanceEmail(
                pickup.email,
                pickup.item,
                updatedRequest.price || 'To be confirmed',
                user.name || 'Dealer'
            ).catch(err => {
                // Log error but don't fail the request
                console.error('Failed to send pickup acceptance email:', err);
            });
        }

        res.json({ success: true, message: 'Request accepted successfully', updatedRequest });
      } catch (error) {
        console.error('Error accepting request:', error);
        res.status(500).json({ success: false, message: 'Server error' });
      }
}

/**
 * Helper function to send pickup acceptance email
 * Non-blocking - errors are logged but don't affect the request
 */
const sendPickupAcceptanceEmail = (customerEmail, itemName, price, dealerName) => {
    return new Promise((resolve, reject) => {
        try {
            const mailUser = process.env.MAIL_USER || process.env.EMAIL;
            const mailPass = process.env.MAIL_PASS || process.env.EMAIL_PASSWORD || process.env.PASSWORD;

            if (!mailUser || !mailPass) {
                console.warn('Email credentials not configured. Skipping email notification.');
                resolve(); // Don't reject - just skip sending
                return;
            }

            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: mailUser,
                    pass: mailPass,
                },
            });

            const mailOptions = {
                from: `RecycleHub <${mailUser}>`,
                to: customerEmail,
                subject: "Your Pickup Request Has Been Accepted! ✓",
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                        <div style="background-color: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0;">
                            <h2 style="margin: 0;">Pickup Request Accepted!</h2>
                        </div>
                        <div style="background-color: white; padding: 20px; border-radius: 0 0 5px 5px; border: 1px solid #ddd;">
                            <p style="color: #333; font-size: 16px;">Dear Customer,</p>
                            
                            <p style="color: #555; font-size: 14px;">
                                Great news! Your pickup request has been accepted by <strong>${dealerName}</strong>.
                            </p>

                            <div style="background-color: #f0f8ff; padding: 15px; border-left: 4px solid #2196F3; margin: 20px 0;">
                                <p style="margin: 5px 0; color: #333;"><strong>Pickup Details:</strong></p>
                                <p style="margin: 5px 0; color: #555;">
                                    <strong>Item:</strong> ${itemName}
                                </p>
                                <p style="margin: 5px 0; color: #555;">
                                    <strong>Estimated Price:</strong> ₹${price}
                                </p>
                            </div>

                            <p style="color: #555; font-size: 14px;">
                                Your pickup is now in progress. The dealer will be in touch with you shortly to confirm the exact pickup date and time.
                            </p>

                            <p style="color: #555; font-size: 14px; margin-bottom: 10px;">
                                If you have any questions, please check your account on the RecycleHub platform or contact us directly.
                            </p>

                            <div style="background-color: #fff3cd; padding: 10px; border-radius: 3px; margin: 20px 0;">
                                <p style="margin: 0; color: #856404; font-size: 13px;">
                                    <strong>Next Step:</strong> Keep yourself available for the scheduled pickup.
                                </p>
                            </div>

                            <p style="color: #999; font-size: 12px; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 20px;">
                                Best regards,<br>
                                <strong>RecycleHub Team</strong><br>
                                Building a sustainable future, one scrap at a time.
                            </p>
                        </div>
                    </div>
                `,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Email sending error:', error);
                    reject(error);
                } else {
                    console.log('Pickup acceptance email sent to:', customerEmail);
                    resolve(info);
                }
            });
        } catch (error) {
            console.error('Error in sendPickupAcceptanceEmail:', error);
            reject(error);
        }
    });
};
export const rejectPickup = async (req, res) => {
        try {
                const { requestId } = req.body;
                const userId = req.user.id;
                
                // Verify user is admin or dealer
                const user = await UserModel.findById(userId).select("userRole");
                if (!user) {
                    return res.status(404).json({ success: false, message: "User not found" });
                }
                
                if (!["admin", "dealer"].includes(user.userRole)) {
                    return res.status(403).json({ success: false, message: "Access denied. Admin or Dealer role required." });
                }

                // Keep item available by resetting status and accepted dealer.
                const updatedRequest = await Pickup.findByIdAndUpdate(
                    requestId,
                    { status: 'not accepted', AcceptedBy: null },
                    { new: true, runValidators: true }
                );

                if (!updatedRequest) {
                    return res.json({ success: false, message: 'Request not found' });
                }

                res.json({ success: true, message: 'Request rejected successfully', updatedRequest });
            } catch (error) {
                console.error('Error rejecting request:', error);
                res.status(500).json({ success: false, message: 'Server error' });
            }
}


export const deletePickup = async (req, res) => {
    try {
        const userId = req.user.id;
        const pickupId = req.params.id;
        
        // Find the pickup
        const pickup = await Pickup.findById(pickupId);
        if (!pickup) {
            return res.status(404).json({ success: false, message: 'Pickup not found' });
        }
        
        // Verify user is the owner or is an admin
        const user = await UserModel.findById(userId).select("userRole");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        
        if (pickup.RequestedBy.toString() !== userId && user.userRole !== 'admin') {
            return res.status(403).json({ success: false, message: "Access denied. You can only delete your own pickups." });
        }
        
        await Pickup.findByIdAndDelete(pickupId);
        console.log("item deleted by user:", userId);
        res.json({success: true, message: 'Item deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, message: 'Failed to delete item' });
    }
}
