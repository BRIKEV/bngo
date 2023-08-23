import { Storage } from 'store/store.model';
import { GameController } from './games/games.model';

export interface Dependencies {
  store: Storage;
  config: {
    userOptionsLength: number;
    boardLength: number;
    expireImages: number;
  };
}

export interface Controllers {
  games: GameController;
}
