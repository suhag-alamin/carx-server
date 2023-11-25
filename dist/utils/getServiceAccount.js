"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const getServiceAccount = () => {
    const serviceAccount = JSON.parse(config_1.default.firebase.serviceAccount);
    return serviceAccount;
};
exports.default = getServiceAccount;
