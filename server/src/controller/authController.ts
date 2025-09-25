import { userModel } from "../models/userModel";
import { IRegisterUserInfo, Request, Response } from "../types";
import { uploadCloudinary } from "../utils/cloudinaryUpload";
import { compareHashString, hashString } from "../utils/hashAndCompare";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, gender }: IRegisterUserInfo = req.body;
    if (
      !name?.trim() ||
      !email?.trim() ||
      !password?.toString().trim() ||
      !gender?.trim()
    ) {
      return res.status(401).json({
        msg: "All credentials required",
        type: "WARNING",
      });
    }
    // check gender type valid
    if (!["MALE", "FEMALE", "OTHER"].includes(gender.toUpperCase())) {
      return res.status(401).json({
        msg: "Invalid gender type",
        type: "WARNING",
      });
    }
    // checking user in DB
    const userExisted = await userModel.findOne({ email });
    if (userExisted) {
      return res.status(400).json({
        msg: "Email already exists !",
        type: "WARNING",
      });
    }
    const avatar = await uploadCloudinary(
      `https://avatar.iran.liara.run/public/${
        gender.toUpperCase() === "MALE" ? "boy" : "girl"
      }?username=${email.split("@")[0]}`
    );

    // return;
    const hashPassword = await hashString(password.toString());

    const user = await userModel.create({
      name: name,
      email: email,
      password: hashPassword,
      avatar: {
        secure_url: avatar?.secure_url,
        public_id: avatar?.public_id,
      },
    });

    if (user) {
      res.status(200).json({
        msg: "Registered successfully",
        type: "SUCCESS",
      });
    }
    res.status(400).json({
      msg: "Unable to registered !",
      type: "ERROR",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error !",
      type: "ERROR",
    });
    console.log(error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email?.trim() || !password?.toString().trim()) {
    return res.status(401).json({
      msg: "All credentials required",
      type: "WARNING",
    });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "We couldn’t find an account with this email.",
        type: "WARNING",
      });
    }

    const comparePassowrd = await compareHashString(
      password.toString(),
      user.password
    );
    if (!comparePassowrd) {
      return res.status(400).json({
        msg: "The password you entered is incorrect. Please try again.",
        type: "WARNING",
      });
    }

    const token: string = jwt.sign(user._id.toString(), process.env.JWT_KEY as string);
    res.status(200).cookie("AUTH_TOKEN", token).json({
      msg: "Logged in Successfully",
      type: "SUCCESS",
      token: token,
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error !",
      type: "ERROR",
    });
    console.log(error);
  }
};
