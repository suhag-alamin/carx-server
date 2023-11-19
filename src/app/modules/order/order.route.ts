import express from 'express';
import { UserRoles } from '../../../enums/user';
import authentication from '../../middlewares/authorization';
import validateRequest from '../../middlewares/validateRequest';
import { OrderController } from './order.controller';
import { OrderValidation } from './order.validation';

const router = express.Router();

router.post(
  '/',
  authentication(UserRoles.User),
  validateRequest(OrderValidation.createOrderZodSchema),
  OrderController.createOrderController,
);

router.get(
  '/',
  authentication(UserRoles.Admin, UserRoles.SuperAdmin),
  OrderController.getAllOrdersController,
);
router.get(
  '/user',
  authentication(UserRoles.User),
  OrderController.getAllOrdersByUserController,
);
router.get(
  '/:id',
  authentication(UserRoles.Admin, UserRoles.SuperAdmin, UserRoles.User),
  OrderController.getSingleOrderController,
);

router.patch(
  '/:id',
  authentication(UserRoles.Admin, UserRoles.SuperAdmin, UserRoles.User),
  validateRequest(OrderValidation.updateOrderZodSchema),
  OrderController.updateOrderController,
);

router.delete(
  '/:id',
  authentication(UserRoles.Admin, UserRoles.SuperAdmin),
  OrderController.deleteOrderController,
);

export const OrderRoutes = router;
