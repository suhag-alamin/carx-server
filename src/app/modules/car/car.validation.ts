import { z } from 'zod';

const createCarZodSchema = z.object({
  body: z.object({
    carName: z
      .string({
        required_error: 'Car name is required',
      })
      .min(3)
      .max(255),
    description: z
      .string({
        required_error: 'Description is required',
      })
      .min(3),
    price: z.number({
      required_error: 'Price is required',
    }),
    img: z.string({
      required_error: 'Image is required',
    }),
    gallery: z
      .string({
        required_error: 'Gallery is required',
      })
      .array(),
  }),
});
const updateCarZodSchema = z.object({
  body: z.object({
    carName: z.string({}).min(3).max(255).optional(),
    description: z.string({}).min(3).optional(),
    price: z.number({}).optional(),
    img: z.string({}).optional(),
    gallery: z.string({}).array().optional(),
  }),
});

export const CarValidation = {
  createCarZodSchema,
  updateCarZodSchema,
};
