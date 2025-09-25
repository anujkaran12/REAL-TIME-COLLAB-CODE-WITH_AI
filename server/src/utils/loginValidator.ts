import jwt from "jsonwebtoken";
import {Response, NextFunction, AuthenticatedRequest } from "../types";

export const loginValidator = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
    
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({
      msg: "TOKEN NOT AVAILABLE",
      type: "ERROR",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY as string);
    if (!decoded) {
      return res.status(401).json({ msg: "INVALID TOKEN", type: "ERROR" });
    }
    req.userID = decoded;
    next();
    // safe to use decoded here
  } catch (err) {
    return res.status(401).json({ error: "INVALID OR EXPIRED TOKEN" });
  }
};
