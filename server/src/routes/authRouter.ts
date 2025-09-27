import express from 'express'
import { loginUser, registerUser, sendVerificationCode } from '../controller/authController';

export const authRouter = express.Router();

authRouter.post("/send-verification-code",sendVerificationCode)
authRouter.post("/register",registerUser)
authRouter.post("/login",loginUser)

