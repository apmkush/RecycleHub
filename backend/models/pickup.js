import mongoose from 'mongoose';

const PickupSchema = new mongoose.Schema({
    item: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    pickupDate: { 
        type: Date, 
        required: true 
    },
    pincode: { 
        type: String, 
        required: true 
    },
    contactNumber: { 
        type: String, 
        required: true 
    },
    weight: { 
        type: Number, 
        required: true 
    },
    address: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String 
    },
    image: { 
        type: String 
    }, // store path or filename
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Pickup = mongoose.model('Pickup', PickupSchema);
