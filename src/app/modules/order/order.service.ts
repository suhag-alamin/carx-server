import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/global';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IPayment } from '../payment/payment.interface';
import { Payment } from '../payment/payment.model';
import { IOrder, IOrderFilters } from './order.interface';
import { Order } from './order.mode';

const createOrder = async (data: IOrder): Promise<IOrder | null> => {
  const { payment, ...orderData } = data;

  const isExist = await Payment.findOne({
    transactionId: (data.payment as IPayment).transactionId,
  });

  if (isExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Payment already exist, please try again',
    );
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // add to payment collection
    const savedPayment = await Payment.create([payment], { session });

    if (!savedPayment) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Failed to place order, please try again',
      );
    }

    // add to order collection

    const order = await Order.create(
      [
        {
          ...orderData,
          payment: savedPayment[0]._id,
        },
      ],
      { session },
      // populate
    );

    if (!order) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Failed to place order, please try again',
      );
    }

    await session.commitTransaction();
    session.endSession();

    return order[0];
  } catch (err) {
    session.abortTransaction();
    // eslint-disable-next-line no-unused-expressions
    config.env === 'development' && console.log(err);
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to place order, please try again',
    );
  }
};

const getAllOrders = async (
  filters: IOrderFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IOrder[]>> => {
  const { ...filtersData } = filters;

  const andConditions = [];

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

  const result = await Order.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
    .populate('user')
    .populate('car')
    .populate('payment');

  const total = await Order.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleOrder = async (id: string): Promise<IOrder | null> => {
  const result = await Order.findById(id)
    .populate('user')
    .populate('car')
    .populate('payment');
  return result;
};

const updateOrder = async (
  id: string,
  data: Partial<IOrder>,
): Promise<IOrder | null> => {
  const isExist = await Order.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }

  const result = await Order.findByIdAndUpdate(id, data, { new: true });
  return result;
};

const deleteOrder = async (id: string): Promise<IOrder | null> => {
  const result = await Order.findByIdAndDelete(id);
  return result;
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
};
