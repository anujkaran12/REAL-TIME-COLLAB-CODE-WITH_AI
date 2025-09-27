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
exports.sendMail = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const node_fetch_1 = __importDefault(require("node-fetch")); // Node 18+ me native fetch hai, old Node me install karna padega
const sendMail = (to, subject, html) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, node_fetch_1.default)('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer re_E4Xmnvov_2XQoBjj5TodYKQwUD3E2ri6o`, // apna API key .env me rakho
            },
            body: JSON.stringify({
                from: 'Code Sync <anujkaran420@gmail.com>', // apna verified email
                to,
                subject,
                html,
            }),
        });
        const data = yield response.json();
        if (!response.ok) {
            console.error('Error sending mail:', data);
            return null;
        }
        console.log('Mail sent:', data);
        return data;
    }
    catch (error) {
        console.error('Error sending mail:', error);
        return null;
    }
});
exports.sendMail = sendMail;
