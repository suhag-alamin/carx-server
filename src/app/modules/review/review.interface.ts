import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IReview = {
  _id: Types.ObjectId;
  review: string;
  rating: number;
  user: Types.ObjectId | IUser;
};

export type ReviewModel = Model<IReview, Record<string, unknown>>;
