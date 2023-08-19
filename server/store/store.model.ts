import { Game } from '../models/game';

export interface Dependencies {
  config: {
    URL: string;
    expire: number;
  };
}

export interface Storage {
  addGame: (game: Game) => Promise<void>;
  getGameByKey: (key: string) => Promise<Game>;
  updateGameByKey: (updateGame: Game) => Promise<Game>;
  getGames: () => Promise<Game[]>;
  removeGames: () => Promise<void>;
}
