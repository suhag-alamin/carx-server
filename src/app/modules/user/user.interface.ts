import { Model, ObjectId } from 'mongoose';

export type IUser = {
  _id: ObjectId;
  role: string;
  email: string;
  displayName: string;
};

export type IUserMethods = {
  // eslint-disable-next-line no-unused-vars
  isUserExist(email: string): Promise<
    | {
        isExist: true;
        user: IUser;
      }
    | {
        isExist: false;
      }
  >;
};

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;

export type IUserFilters = {
  query?: string;
  displayName?: string;
  email?: string;
  role?: string;
};
