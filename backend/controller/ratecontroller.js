import {RateModel} from "../models/rate.js";
import {UserModel} from "../models/user.js";


export const getPrice = async (req, res) => {
    try{
        const scrapItems = await RateModel.find();
        // console.log(scrapItems);
        res.json(scrapItems);
    }catch(e){
        console.log(e);
        res.json({ message: 'Error fetching scrap items' });
    }
}

export const editPrice = async(req, res) => {
    try {
        // Verify user is admin
        const userId = req.user.id;
        const user = await UserModel.findById(userId).select("userRole");
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        
        if (user.userRole !== 'admin') {
            return res.status(403).json({ success: false, message: "Access denied. Admin role required." });
        }

        const { price } = req.body;
        const updatedItem = await RateModel.findByIdAndUpdate(
            req.params.id,
            { price },
            { new: true }
        );
        res.json(updatedItem);
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update price' });
    }
}

export const addItem = async (req, res) => {
    try {
        // Verify user is admin
        const userId = req.user.id;
        const user = await UserModel.findById(userId).select("userRole");
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        
        if (user.userRole !== 'admin') {
            return res.status(403).json({ success: false, message: "Access denied. Admin role required." });
        }

        const {price , image, material, category} = req.body;
        const newItem = await RateModel.create({ price, image, material, category });
        console.log(newItem);
        res.json({success: true, data: newItem});
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, message: 'Failed to add item' });
    }
}

export const deleteItem = async (req, res) => {
    try {
        // Verify user is admin
        const userId = req.user.id;
        const user = await UserModel.findById(userId).select("userRole");
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        
        if (user.userRole !== 'admin') {
            return res.status(403).json({ success: false, message: "Access denied. Admin role required." });
        }

        await RateModel.findByIdAndDelete(req.params.id);
        res.json({success: true, message: 'Item deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, message: 'Failed to delete item' });
    }
}