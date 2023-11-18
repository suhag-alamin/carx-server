import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import authentication from '../../middlewares/authorization';
import { UserRoles } from '../../../enums/user';

const router = express.Router();

router.post(
  '/',
  validateRequest(UserValidation.saveUserZodSchema),
  UserController.saveUserController,
);

router.get(
  '/',
  authentication(UserRoles.Admin, UserRoles.SuperAdmin),
  UserController.getAllUsersController,
);

export const UserRoutes = router;
