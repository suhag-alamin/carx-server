import { z } from 'zod';

const createPaymentIntentsZodSchema = z.object({
  body: z.object({
    amount: z.number({
      required_error: 'Amount is required',
    }),
    currency: z.string({
      required_error: 'Currency is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
  }),
});

export const PaymentValidation = {
  createPaymentIntentsZodSchema,
};
