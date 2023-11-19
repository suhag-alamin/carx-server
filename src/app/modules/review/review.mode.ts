import { Schema, model } from 'mongoose';
import { ReviewModel, IReview } from './review.interface';

const ReviewSchema = new Schema<IReview, Record<string, unknown>>(
  {
    review: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Review = model<IReview, ReviewModel>(
  'Review',
  ReviewSchema,
  'reviews',
);
