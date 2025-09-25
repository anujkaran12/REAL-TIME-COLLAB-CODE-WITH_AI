import Express from "express"
import { fetchUser } from "../controller/userController"

export const userRouter = Express.Router()

userRouter.get('/',fetchUser)