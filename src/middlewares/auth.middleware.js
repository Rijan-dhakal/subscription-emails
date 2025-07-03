import User from "../models/user.model.js"
import { customError } from "../utils/customError.js"
import jwt from 'jsonwebtoken'

export const authorize = async (req, res, next) => {
    try {
        const token = req.cookies?.token
        if(!token) return res.status(400).json({error: "Authorization token missing", message: "Unauthorized"})
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded) customError("Unauthorized", 401)

        const user = await User.findById(decoded.userId).select("-password");
        if(!user) customError("Unauthorized", 401)

        req.user = user

        next()
    } catch (err) {
        res.status(401).json({message: "Unauthorized", error: err.message})
    }
}