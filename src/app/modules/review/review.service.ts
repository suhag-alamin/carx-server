import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/global';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IUser } from '../user/user.interface';
import { IReview } from './review.interface';
import { Review } from './review.mode';

const createReview = async (
  user: IUser,
  data: IReview,
): Promise<IReview | null> => {
  if (!user._id) {
    throw new ApiError(httpStatus.NOT_FOUND, `User not found`);
  }
  data.user = user?._id;
  const result = await Review.create(data);
  return result;
};

const getAllReviews = async (
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IReview[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const result = await Review.find()
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
    .populate('user');

  const total = await Review.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleReview = async (id: string): Promise<IReview | null> => {
  const result = await Review.findById(id).populate('user');
  return result;
};

const updateReview = async (
  id: string,
  data: Partial<IReview>,
): Promise<IReview | null> => {
  const isExist = await Review.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found');
  }

  const result = await Review.findByIdAndUpdate(id, data, { new: true });
  return result;
};

const deleteReview = async (id: string): Promise<IReview | null> => {
  const result = await Review.findByIdAndDelete(id);
  return result;
};

export const ReviewService = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
