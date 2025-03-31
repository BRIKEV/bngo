import http from 'http';
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import { join } from 'path';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { handleHttpError } from 'error-handler-module';
import cookieParser from 'cookie-parser';
import docsValidator from './utils/docsValidator';
import initRouter from './routes';
import config from './config';
import initControllers from './controllers';
import initSocket from './socket';
import initStore from './store';
import logger from './utils/logger';

const app: Express = express();

const serverApp = async () => {
  const store = initStore({ config: config.redis });
  const controllers = initControllers({ store, config: config.game })
  const server = http.createServer(app);
  const socket = await initSocket({ config: config.socket, controllers, http: server });
  app.use(cors())
  const validators = await docsValidator({ app, config: config.swagger });
  // app.use(
  //   helmet({
  //     contentSecurityPolicy: false,
  //     crossOriginOpenerPolicy: false,
  //     crossOriginResourcePolicy: false,
  //     crossOriginEmbedderPolicy: false,
  //   })
  // );
  app.use(cookieParser());
  app.use(compression());
  // Enable the use of request body parsing middleware
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(express.static(join(__dirname, '..', 'client', 'dist')));
  app.use(
    '/api/v1',
    initRouter({ validators, controllers: controllers, config: config.routes })
  );
  app.get('/*', (_req, res) => {
    res.sendFile(join(__dirname, '..', 'client', 'dist', 'index.html'));
  });

  app.use(handleHttpError(logger));

  return {
    app,
    socket,
    store,
  };
};

export default serverApp;
