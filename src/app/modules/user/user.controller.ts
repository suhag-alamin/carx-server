import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { UserService } from './user.service';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { userFilterableFields } from './user.constant';
import { paginationFields } from '../../../constants/pagination';

const saveUserController = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.saveUser(req.body);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User saved successfully',
    data: result,
  });
});

const getAllUsersController = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, userFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await UserService.getAllUsers(filters, paginationOptions);

    sendResponse<IUser[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  },
);

const makeAdminController = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.makeAdmin(req.body);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully',
    data: result,
  });
});

export const UserController = {
  saveUserController,
  getAllUsersController,
  makeAdminController,
};
