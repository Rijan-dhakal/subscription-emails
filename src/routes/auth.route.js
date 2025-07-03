import { Router } from "express";
import { login, signup } from "../controllers/auth.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post('/signup', signup)
authRouter.post('/login', login)
authRouter.get('/checkauth', authorize, (req, res)=>{
    res.send("You are authorized")
})

export default authRouter;