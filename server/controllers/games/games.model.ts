import { Board, Game, User } from "../../models/game";

export interface CreateGame {
  gameName: string;
  gameKey: string;
  topics: number[];
}

interface Turn {
  optionSelected: Board;
  updateGame: Game;
  gameFinished: boolean;
}

interface ReadyToStart {
  username: string;
  gameReady: boolean;
  board: Board[];
  users: Omit<User, "board">[];
}

interface RemoveUser {
  username: string;
  gameReady: boolean;
  users: Omit<User, "board">[];
}

interface UserGameInfo {
  mainBoard: Board[];
  users: Omit<User, "board">[];
  gameReady: boolean;
  username: string;
  board: Board[];
  ready: boolean;
  host: boolean;
}

interface LeaveGame {
  username: string;
  initGame: boolean;
  users: Omit<User, "board">[];
}

export interface GameController {
  createGame: (payload: CreateGame) => Promise<void>;
  joinGame: (key: string, username: string, gameName: string) => Promise<User>;
  playTurn: (key: string) => Promise<Turn>;
  readyToStart: (key: string, username: string) => Promise<ReadyToStart>;
  removeUserFromGame: (key: string, username: string, userToRemove: string) => Promise<RemoveUser>;
  getUserInfo: (key: string, username: string, gameName: string) => Promise<UserGameInfo>;
  hasBingo: (key: string, username: string, gameName: string) => Promise<boolean>;
  finishGame: (key: string, gameName: string) => Promise<Game>;
  leaveGame: (key: string, gameName: string, username: string) => Promise<LeaveGame>;
}
