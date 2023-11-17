import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';

/* eslint-disable no-console */
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err);
  process.exit(1);
});

let server: Server;

const main = async () => {
  try {
    await mongoose.connect(config.databaseURL as string);
    console.log('Connected to database successfully 🎉');
    server = app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port} 🚀`);
    });
  } catch (err) {
    console.log('Failed to connect to database', err);
  }

  process.on('unhandledRejection', err => {
    if (server) {
      console.log(err);
      process.exit(1);
    } else {
      console.log(err);
      process.exit(1);
    }
  });
};

main();

process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. Shutting down gracefully');
  if (server) {
    server.close(() => {
      console.log('Process terminated! ');
    });
  }
});
