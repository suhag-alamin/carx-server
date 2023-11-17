import { z } from 'zod';
import { userRoles } from './user.constant';

const saveUserZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email(),
    displayName: z
      .string({
        required_error: 'Display name is required',
      })
      .min(3, 'Display name must be at least 3 characters long'),
    role: z
      .enum([...userRoles] as [string, ...string[]], {
        required_error: 'Role is required',
      })
      .default('user'),
  }),
});

export const UserValidation = {
  saveUserZodSchema,
};
