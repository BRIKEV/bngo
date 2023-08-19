import {
  CustomErrorTypes,
  errorFactory as buildErrorInstance,
} from 'error-handler-module';

export const unauthorizedError = buildErrorInstance(
  CustomErrorTypes.UNAUTHORIZED
);
export const badRequestError = buildErrorInstance(
  CustomErrorTypes.BAD_REQUEST
);
export const forbiddenError = buildErrorInstance(CustomErrorTypes.FORBIDDEN);
export const internalError = buildErrorInstance('INTERNAL_SERVER_ERROR');
export const notFoundError = buildErrorInstance(CustomErrorTypes.NOT_FOUND);
