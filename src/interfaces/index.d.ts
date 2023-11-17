import { auth } from 'firebase-admin';

/* eslint-disable @typescript-eslint/consistent-type-definitions */
declare global {
  namespace Express {
    interface Request {
      user: auth.DecodedIdToken;
    }
  }
}
