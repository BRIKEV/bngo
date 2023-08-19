const { sign, verify } = require('jsonwebtoken');
const { errorFactory, CustomErrorTypes } = require('error-handler-module');

const forbiddenError = errorFactory(CustomErrorTypes.FORBIDDEN);

const jwt = (secret: string, options = {}) => {
  const signToken = <T>(payload: T) => sign(payload, secret, options);

  const verifyToken = async <T>(payload: string) => {
    try {
      return verify(payload, secret, options) as T;
    } catch (err) {
      const error = err as Error & { extra: unknown };
      throw forbiddenError(error.message, error.extra);
    }
  };

  return { signToken, verifyToken };
};

export default jwt;
