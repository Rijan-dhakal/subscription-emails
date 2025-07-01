import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowerCase: true,
        minLength: [3, 'Username should be at least 3 character long'],
        maxLength: [20, 'Username should be at most 20 character long']
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowerCase: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address']
    },
    password:{
        type: String,
        required: true,
    }

}, {timestamps: true})

const User = mongoose.model("User", userSchema)

export default User;