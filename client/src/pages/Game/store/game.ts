import { BoardItem, User } from '../../../models/game';
import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';

interface Selected {
  image: string;
  name: string;
}

interface UIGame {
  currentResult: {
    animate: boolean | null;
    selected: Selected;
  };
  winner: string | null;
  gameReady: boolean;
  users: User[];
  board: BoardItem[];
  userBoard: BoardItem[];
  user: User | null;
  setUserBoard: (userBoard: BoardItem[]) => void;
  setTotalBoard: (userBoard: BoardItem[]) => void;
  setOptionSelected: (selected: Selected, board: BoardItem[]) => void;
  setUserInfo: (username: string, ready: boolean, host?: boolean) => void;
  activateAnimate: () => void;
  setUsersList: (users: User[]) => void;
  startGame: () => void;
  usernameHasBingo: (username: string) => void;
}

const gamesStore = createWithEqualityFn<UIGame>((set) => ({
  currentResult: {
    animate: null,
    selected: {
      image: '',
      name: '',
    },
  },
  winner: null,
  gameReady: false,
  users: [],
  board: [],
  userBoard: [],
  user: null,
  startGame: () => {
    set({ gameReady: true });
  },
  setUserBoard: (userBoard) => {
    set({ userBoard });
  },
  setTotalBoard(board) {
    set({ board });
  },
  setOptionSelected(selected, board) {
    set({
      board,
      currentResult: {
        selected,
        animate: false,
      },
    });
  },
  setUserInfo(username: string, ready: boolean, host?: boolean) {
    set(state => ({ ...state.user, username, ready, host: !!host }));
  },
  activateAnimate() {
    set(state => ({
      currentResult: {
        ...state.currentResult,
        animate: true,
      },
    }));
  },
  setUsersList(users: User[]) {
    set({ users });
  },
  usernameHasBingo(winner) {
    set({ winner });
  },
}), shallow);

export default gamesStore;
