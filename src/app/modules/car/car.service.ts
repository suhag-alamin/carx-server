import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/global';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { carSearchableFields } from './car.constant';
import { ICar, ICarFilters } from './car.interface';
import { Car } from './car.mode';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createCar = async (data: ICar): Promise<ICar | null> => {
  const result = await Car.create(data);
  return result;
};

const getAllCars = async (
  filters: ICarFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<ICar[]>> => {
  const { query, minPrice, maxPrice, ...filtersData } = filters;

  const andConditions = [];

  if (query) {
    andConditions.push({
      $or: carSearchableFields.map(field => ({
        [field]: {
          $regex: query,
          $options: 'i',
        },
      })),
    });
  }

  if (minPrice && maxPrice) {
    andConditions.push({
      price: {
        $gte: minPrice,
        $lte: maxPrice,
      },
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

  const result = await Car.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Car.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleCar = async (id: string): Promise<ICar | null> => {
  const result = await Car.findById(id);
  return result;
};

const updateCar = async (
  id: string,
  data: Partial<ICar>,
): Promise<ICar | null> => {
  const isExist = await Car.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Car not found');
  }

  const result = await Car.findByIdAndUpdate(id, data, { new: true });
  return result;
};

const deleteCar = async (id: string): Promise<ICar | null> => {
  const result = await Car.findByIdAndDelete(id);
  return result;
};

export const CarService = {
  createCar,
  getAllCars,
  getSingleCar,
  updateCar,
  deleteCar,
};
