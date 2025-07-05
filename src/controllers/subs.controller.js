import Subscription from '../models/subscription.model.js'
import {customError} from '../utils/customError.js'

export const createSubs = async (req, res, next) => {
    try {
        if(!req.body) customError("Request body not found", 400)

        const {name, category, cost, purchasedOn, expiresOn, renewalPolicy} = req.body
        if(!name || !category || !cost || !expiresOn || !renewalPolicy) customError("All fields are required", 400)

        const newSubscription = await Subscription.create({
            user: req.user._id,
            name,
            category,
            cost,
            purchasedOn,
            expiresOn,
            renewalPolicy
        })

        res.status(201).json({success: true, message: "Subscription created successfully", subscription: newSubscription})
        
    } catch (error) {
        next(error)
    }
}


export const getAllSubs = async (req, res, next) => {
    try {
        const getSubs = await Subscription.find({user: req.user._id})

        if(!getSubs || getSubs.length === 0) customError("No subscription found", 404)

        res.status(200).json({success: true, data: getSubs})

    } catch (error) {
        next(error)
    }
}


export const getIndividualSub = async (req, res, next) => {
    try {
        const {subsId} = req.params
        const subscription = await Subscription.findOne({
            _id: subsId,
            user: req.user._id
        })
        
        if(!subscription) customError("Subscription not found", 404)

        res.status(200).json({success: true, data: subscription})
            
    } catch (error) {
        next(error)
    }
}

export const updateSubs = async (req, res, next) => {
    try {
        if(!req.body) customError("Requrest body is missing", 404)

        const { subsId } = req.params;
        const { name, category, cost, purchasedOn, expiresOn, renewalPolicy } = req.body;
        
        const subscription = await Subscription.findOne({
            _id: subsId,
            user: req.user._id
        });
        
        if (!subscription) customError("Subscription not found", 404);
            
        
        const updatedSubscription = await Subscription.findByIdAndUpdate(
            subsId,
            { name, category, cost, purchasedOn, expiresOn, renewalPolicy },
            { new: true, runValidators: true }
        );
        
        res.status(200).json({
            success: true,
            message: "Subscription updated successfully",
            data: updatedSubscription
        });
        
    } catch (error) {
        next(error);
    }
};

export const deleteSubs = async (req, res, next) => {
    try {
        const { subsId } = req.params;
        
        const subscription = await Subscription.findOne({
            _id: subsId,
            user: req.user._id
        });
        
        if (!subscription) customError("Subscription not found", 404);
        
        await Subscription.findByIdAndDelete(subsId);
        
        res.status(200).json({
            success: true,
            message: "Subscription deleted successfully"
        });
        
    } catch (error) {
        next(error);
    }
};