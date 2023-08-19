import { ValidatorInstance } from 'express-oas-validator';
import { Controllers } from '../controllers/controllers.model';

export interface Dependencies {
  controller: Controllers;
  validators: ValidatorInstance;
}
