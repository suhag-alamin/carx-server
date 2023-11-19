import { Schema, model } from 'mongoose';
import { OrderModel, IOrder } from './order.interface';
import { orderStatus } from './order.constant';

const OrderSchema = new Schema<IOrder, Record<string, unknown>>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    car: {
      type: Schema.Types.ObjectId,
      ref: 'Car',
      required: true,
    },
    orderDetails: {
      totalAmount: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        enum: orderStatus,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
      deliveryDetails: {
        address: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
        zipCode: {
          type: String,
          required: true,
        },
        phone: {
          type: String,
          required: true,
        },
      },
    },
    payment: {
      type: Schema.Types.ObjectId,
      ref: 'Payment',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Order = model<IOrder, OrderModel>('Order', OrderSchema, 'orders');
