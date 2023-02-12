import { Server } from 'http';
import mongoose from 'mongoose';
import { WebSocketServer } from 'ws';
import app from './app';
import config from './config/config';
import logger from './config/logger';

let server: Server;
mongoose.connect(config.mongoose.url, config.mongoose.options, () => {
  logger.info('Connected to MongoDB');
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
  const wss = new WebSocketServer({ server });
  wss.on('connection', (ws, req) => {
    ws.on('message', (message) => {
      socketRouter(message, ws);
    });
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
