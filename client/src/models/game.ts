export interface Game {
  id?: string | undefined;
  key: string;
  name: string;
  ready: boolean;
  users: User[];
  board: Board[];
}

export interface Board {
  id: number;
  image: string;
  selected: boolean;
}

export interface User {
  username: string;
  board: Board[];
  ready: boolean;
  host: boolean;
}
