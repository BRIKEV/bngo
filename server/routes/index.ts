import express from 'express';
import initGames from './v1/games';
import { Dependencies } from './routes.model';
const router = express.Router();

const initRouter = ({ controllers, validators, config }: Dependencies) => {
  router.use('/games', initGames({ controllers, validators, config }));

  return router;
};

export default initRouter;
