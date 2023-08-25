import http from 'http';
import { Server } from 'socket.io';
import jwt from '../utils/token';
import logger from '../utils/logger';
import { Controllers } from 'controllers/controllers.model';

interface Dependencies {
  http: http.Server;
  controllers: Controllers;
  config: {
    tokenSecret: string;
    tokenOptions: object;
    endGameTimeout: number;
    interval: number;
  };
}

interface UserInfo {
  username: string;
  gameName: string;
  gameKey: string;
}

const start = async ({ http, controllers, config }: Dependencies) => {
  const { verifyToken } = jwt(config.tokenSecret, config.tokenOptions);
  const io = new Server(http, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"]
    }
  });
  logger.info('create io instance');

  const draw = (socket: Server, room: string, gameKey: string, endGame: () => void) => async () => {
    try {
      const { optionSelected, updateGame, gameFinished } = await controllers.games.playTurn(gameKey);
      socket.to(room).emit('optionSelected', { optionSelected, board: updateGame.board });
      if (gameFinished) {
        endGame();
      }
    } catch (err) {
      logger.info('finish game as there is no more turns');
      endGame();
    }
  };

  const intervals: { [key: string]: NodeJS.Timer | undefined } = {};

  io.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

  io.on('connection', socket => {
    // socket.emit('userConnected', { userId: socket.id });
    let intervalIdentifier: string;
    let username: string;
    let gameName: string;
    let gameKey: string;
    const { accessKey } = socket.handshake.query;
    verifyToken<UserInfo>(accessKey as string)
      .then(userInfo => {
        username = userInfo.username;
        gameName = userInfo.gameName;
        gameKey = userInfo.gameKey;
        logger.info(`New socket connection of user: ${username} game ${gameName} with ${gameKey}`);
        intervalIdentifier = `${gameName}-${gameKey}`;
        return controllers.games.getUserInfo(gameKey, username, gameName);
      }).then(async userInfo => {
        logger.info(`User: ${username} join to game ${gameName} in the DB`);
        const { board, ready, mainBoard, users } = userInfo;
        await socket.join(gameName);
        logger.info(`User: ${username} join to game ${gameName} to the room`);
        io.to(gameName).emit('board', { board: mainBoard, ready });
        io.to(gameName).emit('usersList', { users });
        // info to get the user in the game with the role
        const userInGame = users.find(gameUser => gameUser.username === username);
        if (!userInGame) throw new Error(`User ${username} is not in game ${gameName}`);
        // user events
        io.to(socket.id).emit('newUser', { username, ready, host: userInGame.host });
        io.to(socket.id).emit('yourBoard', { username, board });
      })
      .catch(error => {
        logger.error(`Error in getUserInfo ${error}`);
        io.to(socket.id).emit('errorAccess', {
          message: error.message,
          type: error.type,
        });
      });

    // readyToStart
    socket.on('readyToStart', () => {
      controllers.games.readyToStart(gameKey, username)
        .then(({ gameReady, board, users }) => {
          logger.info(`User: ${username} ready to play`);
          io.to(socket.id).emit('userReady', { username, ready: true });
          io.to(gameName).emit('usersList', { users });
          if (gameReady) {
            logger.info('Game is ready to start');
            io.to(gameName).emit('gameReady', { board });
          }
        })
        .catch(error => {
          logger.error(`Error in readyToStart event ${error}`);
          io.to(socket.id).emit('errorStart', {
            message: error.message,
            type: error.type,
          });
        });
    });

    // removeUser
    socket.on('removeUser', msg => {
      controllers.games.removeUserFromGame(gameKey, username, msg.userToRemove)
        .then(({ gameReady, board, users }) => {
          io.to(gameName).emit('usersList', { users });
          if (gameReady) {
            logger.info('Game is ready to start');
            io.to(gameName).emit('gameReady', { board });
          }
        })
        .catch(error => {
          logger.error(`Error in removeUser event ${error}`);
          io.to(socket.id).emit('errorRemoveUser', {
            message: error.message,
            type: error.type,
          });
        });
    });

    socket.on('startGame', () => {
      if (!intervals[intervalIdentifier]) {
        intervals[intervalIdentifier] = setInterval(
          draw(io, gameName, gameKey, () => { // finish draw cb
            logger.info('Game over all images were displayed');
            // TODO: Separate in one function
            clearInterval(intervals[intervalIdentifier]);
            intervals[intervalIdentifier] = undefined;
            setTimeout(async () => {
              await controllers.games.finishGame(gameKey, gameName);
            }, config.endGameTimeout);
            io.to(gameName).emit('gameEnd');
          }), config.interval,
        );
      }
    });

    socket.on('playAgain', () => {
      controllers.games.joinGame(gameKey, username, gameName).then(() => {
        io.to(socket.id).emit('readyToPlayAgain');
      })
        .catch(error => {
          logger.error(`Error in bingo event ${error}`);
          io.to(socket.id).emit('errorPlayAgain', {
            message: error.message,
            type: error.type,
          });
        });
    });

    socket.on('message', msg => {
      io.to(gameName).emit('message', {
        message: msg.message,
        title: username,
      });
    });

    socket.on('leaveUser', () => {
      controllers.games.leaveGame(gameKey, gameName, username)
        .then(leaveGameInfo => {
          logger.info(`User: ${leaveGameInfo.username} leaves game`);
          io.to(gameName).emit('userLeaves', { username: leaveGameInfo.username });
          io.to(gameName).emit('usersList', { users: leaveGameInfo.users });
          if (leaveGameInfo.initGame) {
            logger.info('Game is ready to start because one user leaves while the rest was ready');
            io.to(gameName).emit('gameReady');
          }
        })
        .catch(error => {
          if (error && error.type === 'not_found') {
            return logger.info(`Username ${username} leaving room ${gameName}`);
          }
          logger.error(`Error in readyToStart event ${error}`);
          return io.to(socket.id).emit('errorLeavesUser', {
            message: error.message,
            type: error.type,
          });
        });
    });

    socket.on('bingo', () => {
      console.log('request bngo', gameKey, username, gameName);
      controllers.games.hasBingo(gameKey, username, gameName)
        .then(async hasBingo => {
          console.log('request bngo', hasBingo);
          if (hasBingo) {
            logger.info(`User has bingo ${username} in game ${gameName}`);
            await controllers.games.finishGame(gameKey, gameName);
            io.to(gameName).emit('usernameHasBingo', { username });
            // TODO: Separate in one function
            clearInterval(intervals[intervalIdentifier]);
            intervals[intervalIdentifier] = undefined;
          } else {
            io.to(socket.id).emit('incorrectBingo', { username });
          }
        })
        .catch(error => {
          logger.error(`Error in bingo event ${error}`);
          io.to(socket.id).emit('errorBingo', {
            message: error.message,
            type: error.type,
          });
        });
    });
  });

  return io;
};

export default start;
