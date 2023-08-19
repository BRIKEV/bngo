import Redis from 'ioredis';
import logger from '../utils/logger';
import { Game } from '../models/game';
import { Storage, Dependencies } from './store.model';

const start = ({ config }: Dependencies): Storage => {
  const redis = new Redis(config.URL);

  redis.on('error', error => {
    logger.error(`Error: redis instance error: ${error.message}`);
    process.exit(1);
  });

  redis.on('connect', () => {
    logger.info('Redis instance was connected');
  });

  const setValue = (json: object) => JSON.stringify(json);

  const getValue = (stringify: string) => JSON.parse(stringify);

  const getGames = async () => {
    const keys = await redis.keys('*');
    const games = await Promise.all(keys.map(key => redis.get(key))) as string[];
    return games.map(getValue);
  };

  const removeGames = async () => {
    redis.flushdb();
  };

  const addGame = async (game: Game) => {
    await redis.setex(game.key, config.expire, setValue(game))
  }

  const getGameByKey = async (key: string) => {
    const value = await redis.get(key);
    if (!value) return {};
    return getValue(value);
  };

  const updateGameByKey = async (updateGame: Game) => {
    await redis.setex(updateGame.key, config.expire, setValue(updateGame));
    return Promise.resolve(updateGame);
  };

  return { addGame, getGameByKey, updateGameByKey, getGames, removeGames };
};

export default start;
