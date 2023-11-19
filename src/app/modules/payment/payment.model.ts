import { Schema, model } from 'mongoose';
import { IPayment, PaymentModel } from './payment.interface';

const paymentSchema = new Schema<IPayment, Record<string, unknown>>({
  amount: {
    type: Number,
    required: true,
  },
  last4: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'success', 'failed'],
  },
  transactionId: {
    type: String,
    required: true,
  },
});

export const Payment = model<IPayment, PaymentModel>(
  'Payment',
  paymentSchema,
  'payments',
);
