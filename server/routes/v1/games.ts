import express from 'express';
import { tagError } from 'error-handler-module';
import { Dependencies } from '../routes.model';
import jwt from '../../utils/token';
import { unauthorizedError } from '../../utils/errorFactory';

const router = express.Router();

const initRouter = ({ controllers, validators, config }: Dependencies) => {
  const { validateRequest, validateResponse } = validators;
  const { signToken } = jwt(config.tokenSecret, config.tokenOptions);
  /**
   * POST /api/v1/games
   * @summary create a game
   * @tags Games
   * @param {CreateGameRequest} request.body.required - join game info
   * @return 201 - Join game response
   * @return 400 - Bad request
   * @return 401 - Unauthorized
   * @return 500 - Internal server error
   */
  router.post('/', async (req, res, next) => {
    try {
      if (!req.headers.authorization) throw unauthorizedError('Needs authorization');
      await controllers.games.createGame({
        gameName: req.body.gameName,
        gameKey: req.body.gameKey,
        topics: req.body.topics,
      }, req.headers.authorization);
      const response = { success: true };
      res.status(201).json(response);
    } catch (error) {
      next(tagError(error));
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
      res.json(response);
    } catch (error) {
      next(tagError(error));
    }
  });

  return router;
};

export default initRouter;
