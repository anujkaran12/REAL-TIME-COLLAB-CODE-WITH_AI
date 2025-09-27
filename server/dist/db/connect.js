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
exports.connectDB = connectDB;
const mongoose_1 = require("mongoose");
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        const mongoUrl = process.env.MONGO_URL;
        if (!mongoUrl) {
            return console.log("MONGO_URL not defined in environment variables");
        }
        try {
            const DBConnected = yield (0, mongoose_1.connect)(process.env.MONGO_URL, {
                dbName: "CODE_SYNC",
                retryWrites: true,
                serverSelectionTimeoutMS: 5000, // fail fast if cluster not reachable
                connectTimeoutMS: 10000, // network/socket timeout
            });
            if (DBConnected) {
                console.log("Successfully connected to DB");
            }
        }
        catch (error) {
            console.log("Unable to connect mongoDB - ", error);
        }
    });
}
