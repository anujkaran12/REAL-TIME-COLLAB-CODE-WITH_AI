import { Request, Response, ErrorRequestHandler,NextFunction } from "express";

export interface IRegisterUserInfo {
  name: string;
  email: string;
  password: string;
  gender:string;
}

export interface AuthenticatedRequest extends Request {
  userID?: any;
}

export { Request, Response  ,ErrorRequestHandler,NextFunction};
