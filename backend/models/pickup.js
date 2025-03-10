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
    price: { 
        type: Number, 
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
    },
    status: { 
        type: String, 
        enum: ['not accepted', 'completed', 'accepted'], 
        default: 'not accepted' 
    },
    RequestedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Assuming you have a User model
        required: true
      },
    AcceptedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Assuming you have a User model
      },
});

export const Pickup = mongoose.model('Pickup', PickupSchema);
