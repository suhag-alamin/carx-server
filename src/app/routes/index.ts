import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { CarRoutes } from '../modules/car/car.route';
import { OrderRoutes } from '../modules/order/order.route';
import { ReviewRoutes } from '../modules/review/review.route';

const router = express.Router();

type IRoute = {
  path: string;
  route: express.Router;
};

const moduleRoutes: IRoute[] = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/cars',
    route: CarRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
];

moduleRoutes.forEach((route: IRoute) => router.use(route.path, route.route));

export default router;
