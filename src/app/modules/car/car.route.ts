import express from 'express';
import authentication from '../../middlewares/authorization';
import validateRequest from '../../middlewares/validateRequest';
import { CarController } from './car.controller';
import { UserRoles } from '../../../enums/user';
import { CarValidation } from './car.validation';

const router = express.Router();

router.post(
  '/',
  authentication(UserRoles.Admin, UserRoles.SuperAdmin),
  validateRequest(CarValidation.createCarZodSchema),
  CarController.createCarController,
);

router.get('/', CarController.getAllCarsController);
router.get('/:id', CarController.getSingleCarController);

router.patch(
  '/:id',
  authentication(UserRoles.Admin, UserRoles.SuperAdmin),
  validateRequest(CarValidation.updateCarZodSchema),
  CarController.updateCarController,
);

router.delete(
  '/:id',
  authentication(UserRoles.Admin, UserRoles.SuperAdmin),
  CarController.deleteCarController,
);

export const CarRoutes = router;
