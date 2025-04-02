import { Storage } from 'store/store.model';
import { GameController } from './games/games.model';

export interface Dependencies {
  store: Storage;
  config: {
    userOptionsLength: number;
    boardLength: number;
    expireImages: number;
  };
  imageService: {
    createPreSignedURLS: (userToken: string, imageURLS: string[], expireImages: number) => Promise<{ signedUrl: string }[]>;
  };
}

export interface Controllers {
  games: GameController;
}
