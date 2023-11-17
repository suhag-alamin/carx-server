import express from 'express';
import { UserRoutes } from '../modules/user/user.route';

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
];

moduleRoutes.forEach((route: IRoute) => router.use(route.path, route.route));

export default router;
