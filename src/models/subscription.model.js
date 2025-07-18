import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name:{
        type: String,
        required: true,
        trim: true
    },
    category:{
        type: String,
        required: true,
        trim: true,
        
    },
    cost:{
        type: Number,
        trim: true,
        required: true
    },
    renewalPolicy:{
        type: String,
        reqired: true,
        enum:['weekly', 'monthly', 'quaterly' ,'yearly']
    },
    purchasedOn:{
        type: Date,
        default: Date.now
    },
    expiresOn:{
        type: Date,
        required: true
    },
    lastSent:{
        type: Date,
        required: true
    }
}, {timestamps: true})

const Subscription = mongoose.model("Subscription", subscriptionSchema)

export default Subscription