"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const mongoose_1 = require("mongoose");
const paymentSchema = new mongoose_1.Schema({
    amount: {
        type: Number,
        required: true,
    },
    last4: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'success', 'failed'],
    },
    transactionId: {
        type: String,
        required: true,
    },
});
exports.Payment = (0, mongoose_1.model)('Payment', paymentSchema, 'payments');
