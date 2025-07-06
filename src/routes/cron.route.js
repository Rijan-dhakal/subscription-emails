import { Router } from "express";
import { cronAuth } from "../middlewares/cronAuth.middleware.js";

const cronRouter = Router()

cronRouter.post("/check-now",cronAuth, (req, res) =>{
    res.send("Running")
})

export default cronRouter;