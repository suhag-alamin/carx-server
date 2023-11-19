import { z } from 'zod';
import { orderStatus } from './order.constant';

const createOrderZodSchema = z.object({
  body: z.object({
    user: z.string({
      required_error: 'User is required',
    }),
    car: z.string({
      required_error: 'Car is required',
    }),
    orderDetails: z.object({
      totalAmount: z.number({
        required_error: 'Total amount is required',
      }),
      status: z.enum([...orderStatus] as [string, ...string[]], {
        required_error: 'Status is required',
      }),
      color: z.string({
        required_error: 'Color is required',
      }),
      deliveryDetails: z.object({
        address: z.string({
          required_error: 'Address is required',
        }),
        city: z.string({
          required_error: 'City is required',
        }),
        country: z.string({
          required_error: 'Country is required',
        }),
        zipCode: z.string({
          required_error: 'Zip code is required',
        }),
        phone: z
          .string({
            required_error: 'Phone is required',
          })
          .min(10)
          .max(15),
      }),
    }),
    payment: z.object({
      transactionId: z.string({
        required_error: 'Transaction id is required',
      }),
      amount: z.number({
        required_error: 'Amount is required',
      }),
      last4: z.string({
        required_error: 'Last 4 is required',
      }),
      currency: z.string({
        required_error: 'Currency is required',
      }),
      status: z.enum(
        ['pending', 'success', 'failed'] as [string, ...string[]],
        {
          required_error: 'Payment Status is required',
        },
      ),
    }),
  }),
});
const updateOrderZodSchema = z.object({
  body: z.object({
    user: z.string().optional(),
    car: z.string().optional(),
    orderDetails: z
      .object({
        totalAmount: z.number().optional(),
        status: z.enum([...orderStatus] as [string, ...string[]]).optional(),
        color: z.string().optional(),
        deliveryDetails: z
          .object({
            address: z.string(),
            city: z.string(),
            country: z.string(),
            zipCode: z.string(),
            phone: z.string(),
          })
          .optional(),
      })
      .optional(),
    payment: z
      .object({
        transactionId: z.string(),
        amount: z.number(),
        last4: z.string(),
        currency: z.string(),
        status: z.enum(['pending', 'success', 'failed'] as [
          string,
          ...string[],
        ]),
      })
      .optional(),
  }),
});

export const OrderValidation = {
  createOrderZodSchema,
  updateOrderZodSchema,
};
