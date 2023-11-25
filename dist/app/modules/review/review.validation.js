"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
const createReviewZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        review: zod_1.z
            .string({
            required_error: 'Review is required',
        })
            .min(3)
            .max(255),
        rating: zod_1.z
            .number({
            required_error: 'Rating is required',
        })
            .min(1)
            .max(5),
    }),
});
const updateReviewZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        review: zod_1.z.string({}).min(3).max(255).optional(),
        rating: zod_1.z.number({}).optional(),
    }),
});
exports.ReviewValidation = {
    createReviewZodSchema,
    updateReviewZodSchema,
};
