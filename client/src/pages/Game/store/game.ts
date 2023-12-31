import { BoardItem, User } from '../../../models/game';
import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';
import { message } from 'antd';
import { removeDuplicateObjects } from './utils';

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
  currentResults: BoardItem[];
  userBoard: BoardItem[];
  user: User | null;
  setUserBoard: (userBoard: BoardItem[]) => void;
  setTotalBoard: (userBoard: BoardItem[], ready: boolean) => void;
  setOptionSelected: (selected: Selected, board: BoardItem[]) => void;
  setUserInfo: (username: string, ready: boolean, host?: boolean) => void;
  activateAnimate: () => void;
  setUsersList: (users: User[]) => void;
  startGame: () => void;
  usernameHasBingo: (username: string) => void;
  incorrectBingo: () => void;
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
  currentResults: [],
  userBoard: [],
  user: null,
  startGame: () => {
    set({ gameReady: true });
  },
  setUserBoard: (userBoard) => {
    set({ userBoard });
  },
  setTotalBoard(board, ready) {
    set({ board, gameReady: ready });
  },
  setOptionSelected(selected, board) {
    set(state => {
      const boardItem = board.find(item => item.image === selected.image) as BoardItem;
      const newResult = [{
        id: boardItem.id,
        image: boardItem.image,
        selected: true,
      }, ...state.currentResults];
      return {
        board,
        currentResults: removeDuplicateObjects(newResult),
        currentResult: {
          selected,
          animate: false,
        },
      };
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
  incorrectBingo: () => {
    message.info('No tienes bingo');
  },
}), shallow);

export default gamesStore;
