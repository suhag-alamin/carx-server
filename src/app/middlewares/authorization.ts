/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextFunction, Request, Response } from 'express';
import { credential as _credential, auth } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import type { DecodedIdToken } from 'firebase-admin/auth';
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import getServiceAccount from '../../utils/getServiceAccount';
import getUser from '../../utils/getUser';
import { IUser } from '../modules/user/user.interface';

const serviceAccount = getServiceAccount();
initializeApp({
  credential: _credential.cert(serviceAccount),
});

const authorization =
  (...requireRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }

      if (serviceAccount.private_key) {
        let verifiedUser: DecodedIdToken | null = null;

        await auth()
          .verifyIdToken(token)
          .then(decodedToken => {
            verifiedUser = decodedToken;
          })
          .catch(error => {
            next(error);
          });

        if (!verifiedUser) {
          throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
        }
        // @ts-ignore
        const user: IUser | null = await getUser(verifiedUser.email);

        if (!user) {
          throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
        }

        req.user = user;

        // role checking

        if (requireRoles?.length && !requireRoles?.includes(user?.role)) {
          throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
        }
      }

      next();
    } catch (err) {
      next(err);
    }
  };

export default authorization;
