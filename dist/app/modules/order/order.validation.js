"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const zod_1 = require("zod");
const order_constant_1 = require("./order.constant");
const createOrderZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z.string({
            required_error: 'User is required',
        }),
        car: zod_1.z.string({
            required_error: 'Car is required',
        }),
        orderDetails: zod_1.z.object({
            totalAmount: zod_1.z.number({
                required_error: 'Total amount is required',
            }),
            status: zod_1.z.enum([...order_constant_1.orderStatus], {
                required_error: 'Status is required',
            }),
            color: zod_1.z.string({
                required_error: 'Color is required',
            }),
            deliveryDetails: zod_1.z.object({
                address: zod_1.z.string({
                    required_error: 'Address is required',
                }),
                city: zod_1.z.string({
                    required_error: 'City is required',
                }),
                country: zod_1.z.string({
                    required_error: 'Country is required',
                }),
                zipCode: zod_1.z.string({
                    required_error: 'Zip code is required',
                }),
                phone: zod_1.z
                    .string({
                    required_error: 'Phone is required',
                })
                    .min(10)
                    .max(15),
            }),
        }),
        payment: zod_1.z.object({
            transactionId: zod_1.z.string({
                required_error: 'Transaction id is required',
            }),
            amount: zod_1.z.number({
                required_error: 'Amount is required',
            }),
            last4: zod_1.z.string({
                required_error: 'Last 4 is required',
            }),
            currency: zod_1.z.string({
                required_error: 'Currency is required',
            }),
            status: zod_1.z.enum(['pending', 'success', 'failed'], {
                required_error: 'Payment Status is required',
            }),
        }),
    }),
});
const updateOrderZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z.string().optional(),
        car: zod_1.z.string().optional(),
        orderDetails: zod_1.z
            .object({
            totalAmount: zod_1.z.number().optional(),
            status: zod_1.z.enum([...order_constant_1.orderStatus]).optional(),
            color: zod_1.z.string().optional(),
            deliveryDetails: zod_1.z
                .object({
                address: zod_1.z.string(),
                city: zod_1.z.string(),
                country: zod_1.z.string(),
                zipCode: zod_1.z.string(),
                phone: zod_1.z.string(),
            })
                .optional(),
        })
            .optional(),
        payment: zod_1.z
            .object({
            transactionId: zod_1.z.string(),
            amount: zod_1.z.number(),
            last4: zod_1.z.string(),
            currency: zod_1.z.string(),
            status: zod_1.z.enum(['pending', 'success', 'failed']),
        })
            .optional(),
    }),
});
exports.OrderValidation = {
    createOrderZodSchema,
    updateOrderZodSchema,
};
