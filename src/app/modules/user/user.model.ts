import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser, Record<string, unknown>>({
  role: {
    type: String,
    default: 'user',
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: {
    type: String,
    required: true,
  },
});

export const User = model<IUser, UserModel>('User', userSchema, 'users');
