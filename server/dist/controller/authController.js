"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const userModel_1 = require("../models/userModel");
const cloudinaryUpload_1 = require("../utils/cloudinaryUpload");
const hashAndCompare_1 = require("../utils/hashAndCompare");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, gender } = req.body;
        if (!(name === null || name === void 0 ? void 0 : name.trim()) ||
            !(email === null || email === void 0 ? void 0 : email.trim()) ||
            !(password === null || password === void 0 ? void 0 : password.toString().trim()) ||
            !(gender === null || gender === void 0 ? void 0 : gender.trim())) {
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
        const userExisted = yield userModel_1.userModel.findOne({ email });
        if (userExisted) {
            return res.status(400).json({
                msg: "Email already exists !",
                type: "WARNING",
            });
        }
        const avatar = yield (0, cloudinaryUpload_1.uploadCloudinary)(`https://avatar.iran.liara.run/public/${gender.toUpperCase() === "MALE" ? "boy" : "girl"}?username=${email.split("@")[0]}`);
        // return;
        const hashPassword = yield (0, hashAndCompare_1.hashString)(password.toString());
        const user = yield userModel_1.userModel.create({
            name: name,
            email: email,
            password: hashPassword,
            avatar: {
                secure_url: avatar === null || avatar === void 0 ? void 0 : avatar.secure_url,
                public_id: avatar === null || avatar === void 0 ? void 0 : avatar.public_id,
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
    }
    catch (error) {
        res.status(500).json({
            msg: "Internal server error !",
            type: "ERROR",
        });
        console.log(error);
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!(email === null || email === void 0 ? void 0 : email.trim()) || !(password === null || password === void 0 ? void 0 : password.toString().trim())) {
        return res.status(401).json({
            msg: "All credentials required",
            type: "WARNING",
        });
    }
    try {
        const user = yield userModel_1.userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: "We couldn’t find an account with this email.",
                type: "WARNING",
            });
        }
        const comparePassowrd = yield (0, hashAndCompare_1.compareHashString)(password.toString(), user.password);
        if (!comparePassowrd) {
            return res.status(400).json({
                msg: "The password you entered is incorrect. Please try again.",
                type: "WARNING",
            });
        }
        const token = jsonwebtoken_1.default.sign(user._id.toString(), process.env.JWT_KEY);
        res.status(200).cookie("AUTH_TOKEN", token).json({
            msg: "Logged in Successfully",
            type: "SUCCESS",
            token: token,
            user: user,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Internal server error !",
            type: "ERROR",
        });
        console.log(error);
    }
});
exports.loginUser = loginUser;
