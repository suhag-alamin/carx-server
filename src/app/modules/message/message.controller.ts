import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { MessageService } from './message.service';

const sendMessageController = catchAsync(
  async (req: Request, res: Response) => {
    await MessageService.sendMessage(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Message sent successfully',
    });
  },
);

export const MessageController = {
  sendMessageController,
};
