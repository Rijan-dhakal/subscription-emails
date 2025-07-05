import { createSubs, getAllSubs, getIndividualSub, updateSubs, deleteSubs } from "../controllers/subs.controller.js";
import {authorize} from '../middlewares/auth.middleware.js'

import { Router } from "express";

const subsRouter = Router()

subsRouter.get("/", authorize, getAllSubs) // get all subscriptions

subsRouter.post("/", authorize, createSubs) // create subscription

subsRouter.get("/:subsId", authorize, getIndividualSub) // get specific subscription

subsRouter.patch("/:subsId", authorize, updateSubs) // update or modify specific subscription

subsRouter.delete("/:subsId", authorize, deleteSubs) // delete specific subscription

export default subsRouter