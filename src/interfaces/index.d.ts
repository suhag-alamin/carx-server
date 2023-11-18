import { IUseInfo } from './global';

/* eslint-disable @typescript-eslint/consistent-type-definitions */
declare global {
  namespace Express {
    interface Request {
      user: IUseInfo;
    }
  }
}
