"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const order_constant_1 = require("./order.constant");
const OrderSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    cars: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: 'Car',
        required: true,
    },
    orderDetails: {
        totalAmount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: order_constant_1.orderStatus,
            required: true,
        },
        // color: {
        //   type: String,
        //   required: true,
        // },
        deliveryDetails: {
            address: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            country: {
                type: String,
                required: true,
            },
            zipCode: {
                type: String,
                required: true,
            },
            phone: {
                type: String,
                required: true,
            },
        },
    },
    payment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Payment',
        required: true,
    },
}, {
    timestamps: true,
});
exports.Order = (0, mongoose_1.model)('Order', OrderSchema, 'orders');
