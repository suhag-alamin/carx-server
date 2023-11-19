import { z } from 'zod';

const createReviewZodSchema = z.object({
  body: z.object({
    review: z
      .string({
        required_error: 'Review is required',
      })
      .min(3)
      .max(255),
    rating: z
      .number({
        required_error: 'Rating is required',
      })
      .min(1)
      .max(5),
  }),
});
const updateReviewZodSchema = z.object({
  body: z.object({
    review: z.string({}).min(3).max(255).optional(),
    rating: z.number({}).optional(),
  }),
});

export const ReviewValidation = {
  createReviewZodSchema,
  updateReviewZodSchema,
};
