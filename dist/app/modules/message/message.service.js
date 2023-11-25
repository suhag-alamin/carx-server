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
exports.MessageService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const getTransporter_1 = require("../../../shared/getTransporter");
const sendMessage = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = (0, getTransporter_1.getTransporter)();
    const mailOptions = {
        from: data.email,
        to: config_1.default.email.to_email,
        subject: `New message from Carx - ${data.subject} - from ${data.name}`,
        html: `
        <h1>You have a new message from Carx</h1>
        <p><b>Name</b>: ${data.name}</p>
        <p><b>Email</b>: ${data.email}</p>
        <p><b>Subject</b>: ${data.subject}</p>
        <p><b>Message</b>: ${data.message}</p>    
    `,
    };
    const info = yield transporter.sendMail(mailOptions);
    if (!info) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Email not sent');
    }
    if (info.messageId) {
        // send auto reply to user
        const autoReplyOptions = {
            from: config_1.default.email.user,
            to: data.email,
            subject: `Thank you for contacting Carx`,
            html: `
          <h1>Thank you for contacting Carx</h1>
          <p>We will get back to you as soon as possible</p>
      `,
        };
        yield transporter.sendMail(autoReplyOptions);
    }
});
exports.MessageService = {
    sendMessage,
};
