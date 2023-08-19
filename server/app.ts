import express, { Express } from 'express';
import bodyParser from 'body-parser';
import { join } from 'path';
import helmet from 'helmet';
import compression from 'compression';
import { handleHttpError } from 'error-handler-module';
import cookieParser from 'cookie-parser';
import docsValidator from './utils/docsValidator';
import initRouter from './routes';
import config from './config';
import controllers from './controllers';
import initStore from './store';
import logger from './utils/logger';
import { verifyAuth, verifyCookieAuth } from './utils/auth';

const app: Express = express();

const serverApp = async () => {
  const store = initStore({ config: config.redis });
  const validators = await docsValidator({ app, config: config.swagger });
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginOpenerPolicy: false,
      crossOriginResourcePolicy: false,
      crossOriginEmbedderPolicy: false,
    })
  );
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
    initRouter({
      controller: controllers({ store, config: config.game }),
      validators: {
        ...validators,
        verifyAuth,
        verifyCookieAuth,
      },
    })
  );
  app.get('/*', (_req, res) => {
    res.sendFile(join(__dirname, '..', 'client', 'dist', 'index.html'));
  });

  app.use(handleHttpError(logger));

  return {
    app,
  };
};

export default serverApp;
