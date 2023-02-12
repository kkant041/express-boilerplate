import express from 'express';
import { RawData } from 'ws';
import authRoute from './auth.route';
import userRoute from './user.route';
import docsRoute from './docs.route';
import config from '../../config/config';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

interface SocketMessageReceived {
  path: string;
  id: string;
  audio: string; // base64 string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const socketRouter = (message: RawData, ws: WebSocket) => {
  const data: SocketMessageReceived = JSON.parse(message.toString());
  switch (data.path) {
    case 'case1':
      console.log('invoke the controller here for case1');
      break;

    default:
      console.log('invoke the controller here for default case');
      break;
  }
};

export default router;
