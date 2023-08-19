import { ValidatorInstance } from 'express-oas-validator';
import { ICheckJwt } from 'utils/auth';
import { Controllers } from '../controllers/controllers.model';

export interface Dependencies {
  controller: Controllers;
  validators: ValidatorInstance & {
    verifyAuth: ICheckJwt;
    verifyCookieAuth: ICheckJwt;
  };
}
