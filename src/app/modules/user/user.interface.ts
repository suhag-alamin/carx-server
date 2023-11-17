import { Model } from 'mongoose';

export type IUser = {
  role: string;
  email: string;
  displayName: string;
};

export type UserModel = Model<IUser, Record<string, unknown>>;

export type IUserFilters = {
  query?: string;
  displayName?: string;
  email?: string;
  role?: string;
};
