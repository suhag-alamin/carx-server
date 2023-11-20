import express from 'express';
import authorization from '../../middlewares/authorization';
import { UserRoles } from '../../../enums/user';
import { PaymentController } from './payment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { PaymentValidation } from './payment.validation';

const router = express.Router();

router.post(
  '/create-payment-intent',
  authorization(UserRoles.User),
  validateRequest(PaymentValidation.createPaymentIntentsZodSchema),
  PaymentController.createPaymentIntentController,
);

export const PaymentRoutes = router;
