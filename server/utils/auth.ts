import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from '../config';
import { forbiddenError, unauthorizedError } from './errorFactory';
import { tagError } from 'error-handler-module';

interface SignPayload {
  id: string;
  role: string;
  exp?: number;
}

// 12 hours
const DEFAULT_EXP = Math.floor(Date.now() / 1000) + (60 * 60 * 12);

export const sign = (payload: SignPayload) => (
  jwt.sign({
    ...payload,
    exp: payload.exp || DEFAULT_EXP,
  }, config.auth.seed as string)
);

export const verify = (token: string) => {
  try {
    const decoded = jwt.verify(token, config.auth.seed as string);
    return decoded as SignPayload;
  } catch (error) {
    throw forbiddenError('INVALID_TOKEN');
  }
};

export type ICheckJwt = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw unauthorizedError('MISSING_TOKEN');
    const tokenPayload = verify(authorization);
    res.locals.id = tokenPayload.id;
    res.locals.role = tokenPayload.role;
    return next();
  } catch (error) {
    return next(tagError(error));
  }
};

export const verifyCookieAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const cookies = req.cookies;
    const authorization = cookies[`${config.env}-access_token`];
    if (!authorization) throw unauthorizedError('MISSING_TOKEN');
    const tokenPayload = verify(authorization);
    res.locals.id = tokenPayload.id;
    res.locals.role = tokenPayload.role;
    return next();
  } catch (error) {
    return next(tagError(error));
  }
};
