import io, { Socket } from 'socket.io-client';
import { BoardItem, User } from '../models/game';

let socket: Socket;

interface Options {
  accessKey: string;
  delay: number;
}

interface Selected {
  image: string;
  name: string;
}

interface Message {
  message: string;
  type: string;
  username: string;
  board: BoardItem[];
  ready: boolean;
  optionSelected: Selected;
  title: string;
  users: User[];
  // TODO: remove this
  host?: boolean;
}

interface Methods {
  errorAccess: ({ message, type }: Pick<Message, 'message' | 'type'>) => void;
  yourBoard: (username: string, board: BoardItem[]) => void;
  board: (board: BoardItem[]) => void;
  userReady: (username: string, ready: boolean, host?: boolean) => void;
  gameReady: () => void;
  optionSelected: (optionSelected: Selected, board: BoardItem[]) => void;
  callbackAfterSelected: () => void;
  incorrectBingo: ({ username }: Pick<Message, 'username'>) => void;
  usernameHasBingo: ({ username }: Pick<Message, 'username'>) => void;
  usersList: (users: User[]) => void;
  userLeaves: ({ username }: Pick<Message, 'username'>) => void;
  userMessage: ({ title, message }: Pick<Message, 'title' | 'message'>) => void;
  readyToPlayAgain: () => void;
}

const IOeventEmitter = (methods: Methods, options: Options) => {
  if (!socket) {
    socket = io('http://localhost:4000/', {
      query: {
        accessKey: options.accessKey,
      },
    });
  }

  socket.on('errorAccess', ({ message, type }) => {
    methods.errorAccess({ message, type });
  });

  socket.on('newUser', ({ username, ready, host }) => {
    methods.userReady(username, ready, host);
  });

  socket.on('yourBoard', ({ username, board }) => {
    methods.yourBoard(username, board);
  });

  socket.on('board', ({ board }) => {
    methods.board(board);
  });

  socket.on('userReady', ({ username, ready }) => {
    methods.userReady(username, ready);
  });

  socket.on('gameReady', () => {
    socket.emit('startGame');
    methods.gameReady();
  });

  socket.on('optionSelected', ({ optionSelected, board }) => {
    methods.optionSelected(optionSelected, board);
    setTimeout(() => {
      methods.callbackAfterSelected();
    }, options.delay);
  });

  socket.on('incorrectBingo', ({ username }) => {
    methods.incorrectBingo({ username });
  });

  socket.on('usernameHasBingo', ({ username }) => {
    methods.usernameHasBingo({ username });
  });

  socket.on('usersList', ({ users }) => {
    methods.usersList(users);
  });

  socket.on('userLeaves', ({ username }) => {
    methods.userLeaves({ username });
  });

  socket.on('message', ({ title, message }) => {
    methods.userMessage({ title, message });
  });

  socket.on('readyToPlayAgain', () => {
    methods.readyToPlayAgain();
  });
};

export const emit = (message: string, payload?: keyof Message) => socket.emit(message, payload);
export const disconnect = () => socket.close();

export default IOeventEmitter;
