import express from 'express';
import { tagError } from 'error-handler-module';
import { Dependencies } from '../routes.model';
import jwt from '../../utils/token';

const router = express.Router();

const initRouter = ({ controllers, validators, config }: Dependencies) => {
  const { validateRequest, validateResponse } = validators;
  const { signToken } = jwt(config.tokenSecret, config.tokenOptions);
  /**
   * POST /api/v1/games
   * @summary create a game
   * @tags Games
   * @param {CreateGameRequest} request.body.required - join game info
   * @return 200 - Join game response
   * @return 400 - Bad request
   * @return 401 - Unauthorized
   * @return 500 - Internal server error
   */
  router.post('/', async (req, res, next) => {
    try {
      await controllers.games.createGame(req.body);
      const response = { success: true };
      return res.json(response);
    } catch (error) {
      return next(tagError(error));
    }
  });

  /**
   * POST /api/v1/games/join
   * @summary Join a game
   * @tags Games
   * @param {JoinGameRequest} request.body.required - join game info
   * @return {AccessGameResponse} 200 - Join game response
   * @return 400 - Bad request
   * @return 401 - Unauthorized
   * @return 500 - Internal server error
   */
  router.post('/join', validateRequest(), async (req, res, next) => {
    try {
      await controllers.games.joinGame(req.body.gameKey, req.body.username, req.body.gameName);
      const response = {
        accessKey: signToken({
          username: req.body.username,
          gameName: req.body.gameName,
          gameKey: req.body.gameKey,
        }),
      };
      validateResponse(response, req);
      return res.json(response);
    } catch (error) {
      return next(tagError(error));
    }
  });

  return router;
};

export default initRouter;
