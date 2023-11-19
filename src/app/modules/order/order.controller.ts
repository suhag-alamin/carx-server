import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';
import { IOrder } from './order.interface';
import { orderFilterableFields } from './order.constant';

const createOrderController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await OrderService.createOrder(req.body);

    sendResponse<IOrder>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order placed successfully',
      data: result,
    });
  },
);

const getAllOrdersController = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, orderFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await OrderService.getAllOrders(filters, paginationOptions);

    sendResponse<IOrder[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Orders retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  },
);

const getAllOrdersByUserController = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, orderFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const user = req.user;

    const result = await OrderService.getAllOrdersByUser(
      filters,
      paginationOptions,
      user,
    );

    sendResponse<IOrder[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Orders retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  },
);

const getSingleOrderController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await OrderService.getSingleOrder(req.params.id);

    sendResponse<IOrder>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order retrieved successfully',
      data: result,
    });
  },
);

const updateOrderController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await OrderService.updateOrder(req.params.id, req.body);

    sendResponse<IOrder>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order updated successfully',
      data: result,
    });
  },
);

const deleteOrderController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await OrderService.deleteOrder(req.params.id);

    sendResponse<IOrder | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order deleted successfully',
      data: result,
    });
  },
);

export const OrderController = {
  createOrderController,
  getAllOrdersController,
  getAllOrdersByUserController,
  getSingleOrderController,
  updateOrderController,
  deleteOrderController,
};
