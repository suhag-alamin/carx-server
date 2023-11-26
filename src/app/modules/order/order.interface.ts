import { Model, Types } from 'mongoose';
import { ICar } from '../car/car.interface';
import { IPayment } from '../payment/payment.interface';
import { IUser } from '../user/user.interface';

type IDeliveryDetails = {
  address: string;
  city: string;
  country: string;
  zipCode: string;
  phone: string;
};

type IOrderDetails = {
  totalAmount: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  // color: string;
  deliveryDetails: IDeliveryDetails;
};

export type IOrder = {
  _id: Types.ObjectId;
  user: Types.ObjectId | IUser;
  cars: Types.ObjectId[] | ICar[];
  orderDetails: IOrderDetails;
  payment: Types.ObjectId | IPayment;
};

export type OrderModel = Model<IOrder, Record<string, unknown>>;

export type IOrderFilters = {
  query?: string;
  user?: string;
  status?: string;
};
