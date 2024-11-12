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
export const getPickups = async (req, res) => {
    try{
        const data = await Pickup.find();
        res.json(data);
    }catch(e){
        console.log(e);
        res.json({ message: 'Error fetching scrap items' });
    }
}
export const acceptPickup = async (req, res) => {
    try {
        const { requestId } = req.body;
        
        // Find the request by ID and update it to accepted
        const updatedRequest = await Pickup.findByIdAndUpdate(
          requestId,
          { status: 'added to cart' },
          { new: true }
        );
    
        if (!updatedRequest) {
          return res.json({ success: false, message: 'Request not found' });
        }
    
        res.json({ success: true, message: 'Request accepted successfully', updatedRequest });
      } catch (error) {
        console.error('Error accepting request:', error);
        res.json({ success: false, message: 'Server error' });
      }
}
// export const rejectPickup = async (req, res) => {
//     try {
//         const { requestId } = req.body;
        
//         // Find the request by ID and update it to rejected
//         const updatedRequest = await Pickup.findByIdAndUpdate(
//           requestId,
//           { status: 'rejected' },
//           { new: true }
//         );
    
//         if (!updatedRequest) {
//           return res.json({ success: false, message: 'Request not found' });
//         }
    
//         res.json({ success: true, message: 'Request rejected successfully', updatedRequest });
//       } catch (error) {
//         console.error('Error rejecting request:', error);
//         res.json({ success: false, message: 'Server error' });
//       }
// }


export const deletePickup = async (req, res) => {
    try {
        await Pickup.findByIdAndDelete(req.params.id);
        res.json({success: true, message: 'Item deleted successfully' });
    } catch (err) {
        console.log(err);
        res.json({success: false, message: 'Failed to delete item' });
    }
}