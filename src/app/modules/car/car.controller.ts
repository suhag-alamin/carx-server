import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { CarService } from './car.service';
import { ICar } from './car.interface';
import { carFilterableFields } from './car.constant';

const createCarController = catchAsync(async (req: Request, res: Response) => {
  const result = await CarService.createCar(req.body);

  sendResponse<ICar>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car created successfully',
    data: result,
  });
});

const getAllCarsController = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, carFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await CarService.getAllCars(filters, paginationOptions);

  sendResponse<ICar[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cars retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleCarController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CarService.getSingleCar(req.params.id);

    sendResponse<ICar>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Car retrieved successfully',
      data: result,
    });
  },
);

const updateCarController = catchAsync(async (req: Request, res: Response) => {
  const result = await CarService.updateCar(req.params.id, req.body);

  sendResponse<ICar>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car updated successfully',
    data: result,
  });
});

const deleteCarController = catchAsync(async (req: Request, res: Response) => {
  const result = await CarService.deleteCar(req.params.id);

  sendResponse<ICar | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car deleted successfully',
    data: result,
  });
});

export const CarController = {
  createCarController,
  getAllCarsController,
  getSingleCarController,
  updateCarController,
  deleteCarController,
};
