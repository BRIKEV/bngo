import express from 'express';
import { Dependencies } from './routes.model';
import initUsers from './v1/users';
import initRecipes from './v1/recipes';
import initFiles from './v1/files';
import initAI from './v1/ai';

const router = express.Router();

const initRouter = ({ controller, validators }: Dependencies) => {
  router.use('/users', initUsers({ controller, validators }));
  router.use('/recipes', initRecipes({ controller, validators }));
  router.use('/files', initFiles({ controller, validators }));
  router.use('/ai', initAI({ controller, validators }));

  return router;
};

export default initRouter;
