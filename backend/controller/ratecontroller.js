import {RateModel} from "../models/rate.js";


export const getPrice = async (req, res) => {
    try{
        const scrapItems = await RateModel.find();
        res.json(scrapItems);
    }catch(e){
        console.log(e);
        res.json({ message: 'Error fetching scrap items' });
    }
}

export const editPrice=async(req,res)=>{
    const { price } = req.body;
    try {
        const updatedItem = await RateModel.findByIdAndUpdate(
        req.params.id,
        { price },
        { new: true }
        );
        res.json(updatedItem);
    } catch (err) {
        res.json({ message: 'Failed to update price' });
  }
}

export const addItem = async (req, res) => {
    const {price , image, material, category} = req.body;
    try {
        const newItem = await RateModel.create({ price, image, material, category });
        console.log(newItem);
        res.json({success: true, data: newItem});
    } catch (err) {
        console.log(err);
        res.json({success: false, message: 'Failed to add item' });
    }
}