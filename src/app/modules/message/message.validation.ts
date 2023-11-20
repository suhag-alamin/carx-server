import { z } from 'zod';

const sendMessageZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    subject: z.string({
      required_error: 'Subject is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Please enter a valid email address'),
    message: z.string({
      required_error: 'Message is required',
    }),
  }),
});

export const MessageValidation = {
  sendMessageZodSchema,
};
