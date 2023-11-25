"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageValidation = void 0;
const zod_1 = require("zod");
const sendMessageZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        subject: zod_1.z.string({
            required_error: 'Subject is required',
        }),
        email: zod_1.z
            .string({
            required_error: 'Email is required',
        })
            .email('Please enter a valid email address'),
        message: zod_1.z.string({
            required_error: 'Message is required',
        }),
    }),
});
exports.MessageValidation = {
    sendMessageZodSchema,
};
