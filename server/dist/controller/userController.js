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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUser = void 0;
const userModel_1 = require("../models/userModel");
const fetchUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = req.userID;
        const user = yield userModel_1.userModel.findById(userID);
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal server error !",
            type: "ERROR",
        });
    }
});
exports.fetchUser = fetchUser;
