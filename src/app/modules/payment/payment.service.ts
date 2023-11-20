import Stripe from 'stripe';
import config from '../../../config';
import { IPaymentData } from './payment.interface';

const createPaymentIntents = async (data: IPaymentData) => {
  const stripe = new Stripe(config.stripe.secretKey as string);
  const paymentIntent: Stripe.Response<Stripe.PaymentIntent> =
    await stripe.paymentIntents.create({
      amount: data.amount,
      currency: data.currency,
      payment_method_types: ['card'],
      receipt_email: data.email,
    });

  return {
    paymentId: paymentIntent.id,
    currency: paymentIntent.currency,
    amount: paymentIntent.amount / 100,
    clientSecret: paymentIntent.client_secret,
  };
};

export const PaymentService = {
  createPaymentIntents,
};
