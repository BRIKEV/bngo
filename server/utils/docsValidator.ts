import { Express } from 'express';
import expressJSDocSwagger, { Options } from 'express-jsdoc-swagger';
import { init, ValidatorInstance } from 'express-oas-validator';

interface Dependencies {
  app: Express;
  config: Options;
}

const initDocs = ({ config, app }: Dependencies): Promise<ValidatorInstance> =>
  new Promise((resolve, reject) => {
    const instance = expressJSDocSwagger(app)(config);

    instance.on('finish', (swaggerDef) => {
      const { validateRequest, validateResponse } = init(swaggerDef);
      resolve({ validateRequest, validateResponse });
    });

    instance.on('error', (error) => {
      reject(error);
    });
  });

export default initDocs;
