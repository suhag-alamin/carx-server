import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(process.cwd(), '.env'),
});

export default {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  databaseURL: process.env.DATABASE_URL,
  stripe: {
    secretKey: process.env.STRIPE_SECRET,
  },
  firebase: {
    serviceAccount: process.env.FIREBASE_SERVICE_ACCOUNT,
  },
  email: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    to_email: process.env.TO_EMAIL,
  },
};
