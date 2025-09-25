
import { userModel } from "../models/userModel";
import { AuthenticatedRequest, Response } from "../types";

export const fetchUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userID = req.userID;
    
    const user = await userModel.findById(userID);
    if (!user) {
      return res.status(404).json({
        msg: "User not found",
        type: "ERROR",
      });
    }
    return res.status(200).json({
      msg: "User fetched",
      user,
      type: "SUCCESS",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error !",
      type: "ERROR",
    });
  }
};
