import { Router } from "express";
import  AuthController  from "../controllers/user.controller.js";


const userRouter = Router();

userRouter.post('/signup', AuthController.register);

userRouter.post('/Login', AuthController.login);

export default userRouter;
