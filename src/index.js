import express from 'express'
import dotenv from 'dotenv'


import {connectDB} from './database/connectDB.js'

dotenv.config({ path: './.env' })

const app = express()
const port = process.env.PORT || 3001

app.get("/",(req, res)=>{
    res.send("Homepage")
})



connectDB()

app.listen(port, ()=>{
    console.log(`App is running on http://localhost:${port}`)
})

