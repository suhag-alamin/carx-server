import express from 'express';
import { TestRoute } from '../modules/test/test.route';

const router = express.Router();

type IRoute = {
  path: string;
  route: express.Router;
};

const moduleRoutes: IRoute[] = [
  {
    path: '/',
    route: TestRoute,
  },
];

moduleRoutes.forEach((route: IRoute) => router.use(route.path, route.route));

export default router;
