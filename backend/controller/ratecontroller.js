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