import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(UserValidation.saveUserZodSchema),
  UserController.saveUserController,
);

router.get('/', UserController.getAllUsersController);

export const UserRoutes = router;
