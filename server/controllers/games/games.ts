import R from 'ramda';
import { GameController, CreateGame } from './games.model';
import { Dependencies } from '../controllers.model';
import { User, BoardItem } from '../../models/game';
import { notFoundError, badRequestError, internalError } from '../../utils/errorFactory';
import shuffleBoard from '../../utils/shuffleBoard';
import getRandomItem from '../../utils/getRandomItem';
import { getTopics, createPreSignedURLS } from '../../supabase/client';
import logger from '../../utils/logger';

const start = ({ store, config }: Dependencies): GameController => {
  const trimText = (text: string) => {
    const trim = text ? text.trim() : text;
    return trim;
  };

  const filteredUsers = (users: User[]) => users.map(R.omit(['board']));
  const removeUser = (username: string) => (user: User) => user.username !== username;
  const findUser = (username: string) => (user: User) => user.username === username;

  const createGame = async ({ gameName, gameKey, topics }: CreateGame, userToken: string) => {
    const gameExists = await store.getGameByKey(gameKey);
    if (gameExists && gameExists.key === gameKey) {
      throw badRequestError('This game was already created');
    }
    const topicsInfo = await getTopics(topics, userToken);
    const board = topicsInfo.data.map(topicInfo => {
      return topicInfo.images.map(image => ({
        id: image.id,
        image: image.url,
        selected: false,
      }));
    }).flat();
    logger.info('Creating game');
    let shuffledBoard = shuffleBoard<BoardItem>(board, config.boardLength);
    const imageURLS = shuffledBoard.map(boardItem => boardItem.image);
    const preSignedURLS = await createPreSignedURLS(userToken, imageURLS, config.expireImages);
    console.log(preSignedURLS);
    if (!preSignedURLS) throw internalError('Error creating images urls');
    shuffledBoard = shuffledBoard.map((boardItem, index) => ({
      ...boardItem,
      image: preSignedURLS[index].signedUrl,
    }));
    const game = {
      key: trimText(gameKey),
      name: trimText(gameName),
      ready: false,
      users: [],
      board: shuffledBoard,
    };
    await store.addGame(game);
    return Promise.resolve();
  };

  const getGameByKey = async (key: string) => {
    const notFoundKeyError = () => badRequestError('Key is required');
    const notFoundGame = () => notFoundError('Game key does not exists');
    if (!key) {
      throw notFoundKeyError();
    }
    const game = await store.getGameByKey(key);
    if (!game) {
      throw notFoundGame();
    }
    return game;
  };

  const joinGame = async (key: string, username: string, gameName: string) => {
    const trimUsername = trimText(username);
    const game = await getGameByKey(trimText(key));
    if (game.name !== trimText(gameName)) {
      throw notFoundError('Gamename not found');
    }
    if (game.ready) {
      throw badRequestError('Game has already started');
    }
    const isAlreadyAdded = game.users.some(findUser(trimUsername));
    if (isAlreadyAdded) {
      throw badRequestError('User already joined');
    }
    const board = shuffleBoard<BoardItem>(game.board, config.userOptionsLength);
    let newUser = { username: trimUsername, board, ready: false, host: false };
    if (game.users.length === 0) {
      newUser = { ...newUser, host: true };
    }
    const updateGame = {
      ...game,
      users: [
        ...game.users,
        newUser,
      ],
    };
    await store.updateGameByKey(updateGame);
    return Promise.resolve(newUser);
  };

  const updateBoard = (board: BoardItem[], optionSelected: BoardItem) => (
    board.map(boardItem => {
      if (boardItem.id === optionSelected.id) {
        return { ...boardItem, selected: true };
      }
      return { ...boardItem };
    })
  );

  const removeUserFromGame = async (key: string, username: string, userToRemove: string) => {
    const game = await getGameByKey(key);
    const hostUser = game.users.find(findUser(username));
    if (hostUser !== undefined && !hostUser.host) {
      throw new Error('Error: only host can do this');
    }
    const newUsers = game.users.filter(removeUser(userToRemove));
    const gameReady = (
      newUsers.filter(({ ready }) => ready).length === newUsers.length
    );
    const updateGame = {
      ...game,
      ready: gameReady,
      users: newUsers,
    };
    await store.updateGameByKey(updateGame);
    return Promise.resolve({
      username,
      gameReady,
      board: updateGame.board,
      users: filteredUsers(newUsers),
    });
  };

  const readyToStart = async (key: string, username: string) => {
    const game = await getGameByKey(key);
    const newUsers = game.users.map(user => {
      if (user.username === username) {
        return { ...user, ready: true };
      }
      return { ...user };
    });
    const gameReady = (
      newUsers.filter(({ ready }) => ready).length === game.users.length
    );
    const updateGame = {
      ...game,
      ready: gameReady,
      users: newUsers,
    };
    // TODO: if condition
    const { board: userBoard } = game.users.find(findUser(username)) as User;
    await store.updateGameByKey(updateGame);
    return Promise.resolve({
      username,
      gameReady,
      board: userBoard,
      users: filteredUsers(newUsers),
    });
  };

  const isGameOver = (board: BoardItem[]) => (
    board.filter(({ selected }) => selected).length === config.boardLength
  );

  const playTurn = async (key: string) => {
    const game = await getGameByKey(key);
    if (!game.ready) {
      const error = new Error('Error: game is not ready yet');
      throw error;
    }
    const validBoard = game.board.filter(({ selected }) => !selected);
    const optionSelected = getRandomItem<BoardItem>(validBoard);
    const newBoard = updateBoard(game.board, optionSelected);
    const updateGame = {
      ...game,
      users: game.users.map(user => ({
        ...user,
        board: updateBoard(user.board, optionSelected),
      })),
      board: newBoard,
    };
    const gameFinished = isGameOver(newBoard);
    const noUsers = updateGame.users.length === 0;
    await store.updateGameByKey(updateGame);
    return Promise.resolve({
      optionSelected,
      updateGame: {
        ...updateGame,
        board: newBoard,
      },
      gameFinished: gameFinished || noUsers,
    });
  };

  const getUserInfo = async (key: string, username: string, gameName: string) => {
    const game = await getGameByKey(key);
    if (game.name !== gameName) {
      throw notFoundError('Gamename not found');
    }
    const gameUser = game.users.find(findUser(username));
    if (!gameUser) {
      throw notFoundError('User not found in this game');
    }
    return Promise.resolve({
      ...gameUser,
      mainBoard: game.board,
      users: filteredUsers(game.users),
      gameReady: game.ready,
    });
  };

  const hasBingo = async (key: string, username: string, gameName: string) => {
    const user = await getUserInfo(key, gameName, username);
    const userBoard = user.board.filter(({ selected }) => selected);
    return (user.gameReady && userBoard.length === config.userOptionsLength);
  };

  const finishGame = async (key: string, gameName: string) => {
    const game = await getGameByKey(key);
    if (game.name !== gameName) {
      throw notFoundError('Gamename not found');
    }
    const updateGame = {
      ...game,
      ready: false,
      // board: getBoard(game.types, config.boardLength),
      // TODO: add new game
      board: [],
      users: [],
    };
    return store.updateGameByKey(updateGame);
  };

  const leaveGame = async (key: string, gameName: string, username: string) => {
    const game = await getGameByKey(key);
    if (game.name !== gameName) {
      throw notFoundError('Gamename not found');
    }
    const userInGame = game.users.find(findUser(username));
    if (!userInGame) {
      throw notFoundError('Username not found to leave the room');
    }
    const newUsers = game.users.filter(user => !(user.username === username));
    const usersReady = newUsers.filter(({ ready }) => ready).length;
    const gameReady = (
      usersReady === game.users.length - 1
    ) && usersReady !== 0;
    const updateGame = {
      ...game,
      ready: gameReady,
      users: newUsers,
    };
    await store.updateGameByKey(updateGame);
    return Promise.resolve({
      username,
      initGame: !game.ready && gameReady && newUsers.length !== 0,
      users: filteredUsers(newUsers),
    });
  };

  return {
    createGame,
    joinGame,
    playTurn,
    readyToStart,
    removeUserFromGame,
    getUserInfo,
    hasBingo,
    finishGame,
    leaveGame,
  };
};

export default start;
