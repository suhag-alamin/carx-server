import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/global';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { userSearchableFields } from './user.constant';
import { IUser, IUserFilters } from './user.interface';
import { User } from './user.model';
import { UserRoles } from '../../../enums/user';

const saveUser = async (data: IUser): Promise<IUser | null> => {
  const user = new User();
  const isUserExist = await user.isUserExist(data.email);

  if (!isUserExist.isExist) {
    const result = await User.create({
      ...data,
      role: data?.role || UserRoles.User,
    });
    return result;
  }
  return null;

  // if (isUserExist.isExist) {
  //   const result = await User.findByIdAndUpdate(
  //     isUserExist?.user._id,
  //     {
  //       role: data?.role || UserRoles.User,
  //     },
  //     {
  //       new: true,
  //     },
  //   );
  //   return result;
  // }
  // return null;
  // else {
  //   const result = await User.create({
  //     ...data,
  //     role: data?.role || UserRoles.User,
  //   });
  //   return result;
  // }
};

const getAllUsers = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IUser[]>> => {
  const { query, ...filtersData } = filters;

  const andConditions = [];

  if (query) {
    andConditions.push({
      $or: userSearchableFields.map(field => ({
        [field]: {
          $regex: query,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await User.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getUserDetails = async (email: string): Promise<IUser | null> => {
  const user = new User();
  const isUserExist = await user.isUserExist(email);

  if (!isUserExist.isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  return isUserExist.user;
};

const makeAdmin = async (data: IUser): Promise<IUser | null> => {
  const user = new User();
  const isUserExist = await user.isUserExist(data.email);

  if (!isUserExist.isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await User.findByIdAndUpdate(
    isUserExist.user._id,
    {
      role: UserRoles.Admin,
    },
    {
      new: true,
    },
  );
  return result;
};

export const UserService = {
  saveUser,
  getAllUsers,
  getUserDetails,
  makeAdmin,
};
