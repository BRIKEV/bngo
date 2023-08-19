import express from 'express';
import { tagError } from 'error-handler-module';
import { Dependencies } from '../routes.model';
import logger from '../../utils/logger';

const router = express.Router();

const initRouter = ({ controller, validators }: Dependencies) => {
  const { validateRequest, validateResponse, verifyAuth } = validators;
  /**
   * POST /api/v1/users/register
   * @summary List of foodai users
   * @tags Users
   * @param {AuthRequest} request.body.required - user auth request
   * @return {UserAuth} 201 - User oauth access
   * @return 401 - Unauthorized
   * @return 500 - Internal server error
   */
  router.post('/register', validateRequest(), async (req, res, next) => {
    try {
      const role = await controller.roles.findRole('USER');
      logger.info('role retrieved');
      const user = await controller.users.registerUser(req.body.token, role.id);
      logger.info('user registered');
      validateResponse(user, req, 201);
      return res.status(201).json(user);
    } catch (error) {
      return next(tagError(error));
    }
  });

  /**
   * GET /api/v1/users/me
   * @summary User info
   * @tags Users
   * @return {UserMe} 200 - User info
   * @return 404 - Not found error
   * @return 500 - Internal server error
   */
  router.get(
    '/me',
    verifyAuth,
    async (req, res, next) => {
      try {
        const id = res.locals.id;
        const user = await controller.users.getUser(id);
        validateResponse(user, req);
        return res.json(user);
      } catch (error) {
        return next(tagError(error));
      }
    }
  );

  /**
   * GET /api/v1/users/me/ai
   * @summary User info
   * @tags Users
   * @return {UserIAUsage} 200 - User info
   * @return 404 - Not found error
   * @return 500 - Internal server error
   */
  router.get(
    '/me/ai',
    verifyAuth,
    async (req, res, next) => {
      try {
        const id = res.locals.id;
        const user = await controller.users.getAIUsage(id);
        validateResponse(user, req);
        return res.json(user);
      } catch (error) {
        return next(tagError(error));
      }
    }
  );

  return router;
};

export default initRouter;
