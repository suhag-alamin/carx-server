import { Schema, model } from 'mongoose';
import { userRoles } from './user.constant';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser, Record<string, unknown>>({
  role: {
    type: String,
    enum: userRoles,
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

userSchema.methods.isUserExist = async function (email: string): Promise<
  | {
      isExist: true;
      user: IUser;
    }
  | {
      isExist: false;
    }
> {
  const user = await User.findOne({ email });
  if (user) {
    return {
      isExist: true,
      user,
    };
  }
  return {
    isExist: false,
  };
};

export const User = model<IUser, UserModel>('User', userSchema, 'users');
