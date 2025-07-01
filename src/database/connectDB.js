import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        const connected = await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log(`DB connection successful: ${connected.connection.host}`)
    } catch (error) {
        console.log('Error connecting mongoDB!!!!: ', error)
        process.exit(1)
    } 
} 