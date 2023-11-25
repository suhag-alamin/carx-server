"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.join(process.cwd(), '.env'),
});
exports.default = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5000,
    databaseURL: process.env.DATABASE_URL,
    stripe: {
        secretKey: process.env.STRIPE_SECRET,
    },
    firebase: {
        serviceAccount: process.env.FIREBASE_SERVICE_ACCOUNT,
    },
    email: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
        to_email: process.env.TO_EMAIL,
    },
};
