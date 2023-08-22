import { create } from 'zustand';
import { BoardItem, User } from '../../../models/game';

interface Selected {
  image: string;
  name: string;
}

interface UIGame {
  currentResult: {
    animate: boolean | null;
    selected: Selected;
  };
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
}

const gamesStore = create<UIGame>()((set) => ({
  currentResult: {
    animate: null,
    selected: {
      image: '',
      name: '',
    },
  },
  users: [],
  board: [],
  userBoard: [],
  user: null,
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
}));

export default gamesStore;
