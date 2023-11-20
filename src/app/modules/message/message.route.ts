import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { MessageValidation } from './message.validation';
import { MessageController } from './message.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(MessageValidation.sendMessageZodSchema),
  MessageController.sendMessageController,
);

export const MessageRoutes = router;
