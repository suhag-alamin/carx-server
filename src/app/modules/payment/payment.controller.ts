import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { PaymentService } from './payment.service';

const createPaymentIntentController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await PaymentService.createPaymentIntents(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Payment intent created successfully!',
      data: result,
    });
  },
);

export const PaymentController = {
  createPaymentIntentController,
};
