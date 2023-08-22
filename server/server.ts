import serverApp from './app';
import logger from './utils/logger';

const PORT = process.env.PORT || 4000;

serverApp()
  .then(({ app, socket }) =>{
    const server = app.listen(PORT, () => logger.info(`Listening PORT: ${PORT}`));
    socket.listen(server);
  })
  .catch((err) => {
    logger.error(err);
    process.exit(1);
  });
