import { Model, Types } from 'mongoose';

export type IPayment = {
  _id: Types.ObjectId;
  transactionId: string;
  amount: number;
  last4: string;
  currency: string;
  status: 'pending' | 'success' | 'failed';
};

export type PaymentModel = Model<IPayment, Record<string, unknown>>;

export type IPaymentData = {
  amount: number;
  currency: string;
  email: string;
};
