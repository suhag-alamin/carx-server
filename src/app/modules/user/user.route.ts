import express from 'express';
import { UserRoles } from '../../../enums/user';
import authentication from '../../middlewares/authorization';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(UserValidation.saveUserZodSchema),
  UserController.saveUserController,
);

router.patch(
  '/make-admin',
  authentication(UserRoles.Admin, UserRoles.SuperAdmin),
  UserController.makeAdminController,
);

router.get(
  '/',
  authentication(UserRoles.Admin, UserRoles.SuperAdmin),
  UserController.getAllUsersController,
);
router.get('/:email', UserController.getUserDetailsController);

export const UserRoutes = router;
