"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentValidation = void 0;
const zod_1 = require("zod");
const createPaymentIntentsZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        amount: zod_1.z.number({
            required_error: 'Amount is required',
        }),
        currency: zod_1.z.string({
            required_error: 'Currency is required',
        }),
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
    }),
});
exports.PaymentValidation = {
    createPaymentIntentsZodSchema,
};
