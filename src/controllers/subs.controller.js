import Subscription from '../models/subscription.model.js'
import {customError} from '../utils/customError.js'

export const createSubs = async (req, res, next) => {
    try {
        const {name, catagory, cost, purchasedOn, expiresOn, renewalPolicy} = req.body
        if(!name || !catagory || !cost ||!purchasedOn || !expiresOn || !renewalPolicy) customError("All fields are required", 400)

        const newSubscription = await Subscription.create({
            user: req.user.userId,
            name,
            catagory,
            cost,
            purchasedOn,
            expiresOn
        })

        res.status(201).json({success: true, message: "Subscription created successfully", subscription:{newSubscription}})
        
    } catch (error) {
        next(error)
    }
}


export const getAllSubs = async (req, res, next) => {
    try {
        const {id} = req.body

        if(id != req.user.userId) customError('You are not the owner', 401)

        const getSubs = await Subscription.find({user: req.user.userId})

        if(!getSubs || getSubs.length === 0) customError("NO subscription found", 404)

        res.status(200).json({success: true, data: {getSubs}})

    } catch (error) {
        next(error)
    }
}