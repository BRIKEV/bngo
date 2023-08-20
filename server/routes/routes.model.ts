import { ValidatorInstance } from 'express-oas-validator';
import { Controllers } from '../controllers/controllers.model';

export interface Dependencies {
  controllers: Controllers;
  validators: ValidatorInstance;
  config: {
    tokenSecret: string;
    tokenOptions: object;
  };
}
