import express from 'express';

const router = express.Router();

const initRouter = () => {
  router.use('/your-route', (req, res) => {
    res.json({ success: true });
  });

  return router;
};

export default initRouter;
