import { createSubs, getAllSubs } from "../controllers/subs.controller.js";
import {authorize} from '../middlewares/auth.middleware.js'

import { Router } from "express";

const subsRouter = Router()

subsRouter.get("/", authorize, getAllSubs) // get all subscriptions

subsRouter.post("/",authorize, createSubs) // create subscription

// subsRouter.get("/subs/:subsId") // get specific subscription

// subsRouter.patch("/subs/:subsId") // update or modify specific subscription

// subsRouter.delete("/subs/:subsId") // delete specific subscription

export default subsRouter