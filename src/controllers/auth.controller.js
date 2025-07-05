import User from "../models/user.model.js"
import { customError } from "../utils/customError.js"
import bcrypt from "bcryptjs"
import { generateJWT } from "../utils/generateJWT.js"

export const signup = async (req, res, next) => {
    try {
        
        if (!req.body) {
            return customError("Request body is missing", 400)
        }

        const {username, email, password} = req.body
        
        if(!username || !email || !password) {
            return customError("All parameters are required", 400)
        }
        
        const isUserExist = await User.findOne({ $or: [{ email }, { username }] });
        if(isUserExist) customError("User already exists", 400)

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        })
        
        const token = generateJWT(newUser)
        res.cookie("token", token, {httpOnly: true})

        res.status(201).json({
            message: "User created successfully",
            success: true,
            user: {
                username: newUser.username,
                email: newUser.email,
                _id: newUser._id
            }
        })

    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    try {

        if (!req.body) {
            return customError("Request body is missing", 400)
        }

        const {email, password, username} = req.body
        
        // Validate required fields
        if((!email && !username) || !password) {
            return customError("Email/Username and password are required", 400)
        }

        // check for email or username
        const user = await User.findOne({
            $or: [{email}, {username}]
        });

        // showing Invalid credintials instead of user not found
        if(!user) customError("Invalid credentials", 400)

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if(!isPasswordMatch) customError("Invalid credentials", 400)

        // generating JWT and setting cookie
        const token = generateJWT(user)
        res.cookie("token", token, {httpOnly: true})

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                username: user.username,
                email: user.email,
                _id: user._id
            }
        })

    } catch (error) {
        next(error)
    }
}