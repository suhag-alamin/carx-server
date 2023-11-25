"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const saveUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: 'Email is required',
        })
            .email(),
        displayName: zod_1.z
            .string({
            required_error: 'Display name is required',
        })
            .min(3, 'Display name must be at least 3 characters long'),
        role: zod_1.z
            .enum([...user_constant_1.userRoles], {
            required_error: 'Role is required',
        })
            .default('user'),
    }),
});
exports.UserValidation = {
    saveUserZodSchema,
};
