import { NextFunction, Request, Response } from 'express';
import { auth } from 'firebase-admin';
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';

const authentication =
  (...requireRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }

      let verifiedUser = null;

      verifiedUser = await auth().verifyIdToken(token);

      req.user = verifiedUser;

      // role checking

      if (requireRoles?.length && !requireRoles?.includes(verifiedUser?.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
      }
      next();
    } catch (err) {
      next(err);
    }
  };

export default authentication;
