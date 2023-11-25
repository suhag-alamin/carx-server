"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarValidation = void 0;
const zod_1 = require("zod");
const createCarZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        carName: zod_1.z
            .string({
            required_error: 'Car name is required',
        })
            .min(3)
            .max(255),
        description: zod_1.z
            .string({
            required_error: 'Description is required',
        })
            .min(3),
        price: zod_1.z.number({
            required_error: 'Price is required',
        }),
        img: zod_1.z.string({
            required_error: 'Image is required',
        }),
        gallery: zod_1.z
            .string({
            required_error: 'Gallery is required',
        })
            .array(),
    }),
});
const updateCarZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        carName: zod_1.z.string({}).min(3).max(255).optional(),
        description: zod_1.z.string({}).min(3).optional(),
        price: zod_1.z.number({}).optional(),
        img: zod_1.z.string({}).optional(),
        gallery: zod_1.z.string({}).array().optional(),
    }),
});
exports.CarValidation = {
    createCarZodSchema,
    updateCarZodSchema,
};
