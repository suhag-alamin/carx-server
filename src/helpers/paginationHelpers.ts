import { SortOrder } from 'mongoose';
import {
  IPaginationOptions,
  IPaginationOptionsResult,
} from '../interfaces/pagination';

const calculatePagination = (
  option: IPaginationOptions,
): IPaginationOptionsResult => {
  const page: number = Number(option.page || 1);
  const limit: number = Number(option.limit || 10);
  const skip: number = (page - 1) * limit;

  const sortBy: string = option.sortBy || 'createdAt';
  const sortOrder: SortOrder = option.sortOrder || 'desc';

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export const paginationHelpers = {
  calculatePagination,
};
