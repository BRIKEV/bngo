import serverApp from './app';
import logger from './utils/logger';

const PORT = process.env.PORT || 4000;

serverApp()
  .then(({ app }) =>
    app.listen(PORT, () => logger.info(`Listening PORT: ${PORT}`))
  )
  .catch((err) => {
    logger.error(err);
    process.exit(1);
  });
