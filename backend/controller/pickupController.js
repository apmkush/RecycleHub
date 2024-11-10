import {Pickup} from "../models/pickup.js";


export const addPickup = async (req, res) => {
    try {
        const {
            item, description, pickupDate, pincode,
            contactNumber, weight, address, email, image
        } = req.body;
        
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
        });

        await newPickup.save();
        res.json({success:true, message: 'Pickup created successfully', data: newPickup });
    } catch (error) {
        console.error(error);
        res.json({success:false, message: 'Server error' });
    }
}