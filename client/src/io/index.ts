import io, { Socket } from 'socket.io-client';
import { BoardItem, User } from '../models/game';

let socket: Socket;

interface Options {
  accessKey: string;
  delay: number;
}

interface Message {
  message: string;
  type: string;
  username: string;
  board: BoardItem[];
  ready: boolean;
  optionSelected: BoardItem;
  title: string;
  users: User[];
  // TODO: remove this
  host?: boolean;
}

interface Methods {
  errorAccess: ({ message, type }: Pick<Message, 'message' | 'type'>) => void;
  yourBoard: ({ username, board }: Pick<Message, 'username' | 'board'>) => void;
  board: ({ board }: Pick<Message, 'board'>) => void;
  userReady: ({ username, ready, host }: Pick<Message, 'username' | 'ready' | 'host'>) => void;
  gameReady: () => void;
  optionSelected: ({ optionSelected, board }: Pick<Message, 'optionSelected' | 'board'>) => void;
  callbackAfterSelected: () => void;
  incorrectBingo: ({ username }: Pick<Message, 'username'>) => void;
  usernameHasBingo: ({ username }: Pick<Message, 'username'>) => void;
  usersList: ({ users }: Pick<Message, 'users'>) => void;
  userLeaves: ({ username }: Pick<Message, 'username'>) => void;
  userMessage: ({ title, message }: Pick<Message, 'title' | 'message'>) => void;
  readyToPlayAgain: () => void;
}

const IOeventEmitter = (methods: Methods, options: Options) => {
  if (!socket) {
    socket = io('/', {
      query: {
        accessKey: options.accessKey,
      },
    });
  }

  socket.on('errorAccess', ({ message, type }) => {
    methods.errorAccess({ message, type });
  });

  socket.on('newUser', ({ username, ready, host }) => {
    methods.userReady({ username, ready, host });
  });

  socket.on('yourBoard', ({ username, board }) => {
    methods.yourBoard({ username, board });
  });

  socket.on('board', ({ board }) => {
    methods.board({ board });
  });

  socket.on('userReady', ({ username, ready }) => {
    methods.userReady({ username, ready });
  });

  socket.on('gameReady', () => {
    socket.emit('startGame');
    methods.gameReady();
  });

  socket.on('optionSelected', ({ optionSelected, board }) => {
    methods.optionSelected({ optionSelected, board });
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
    methods.usersList({ users });
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

export const emit = (message: string, payload: keyof Message) => socket.emit(message, payload);
export const disconnect = () => socket.close();

export default IOeventEmitter;
