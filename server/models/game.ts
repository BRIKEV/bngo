export interface Game {
  id?: string | undefined;
  key: string;
  name: string;
  ready: boolean;
  users: User[];
  board: BoardItem[];
}

export interface BoardItem {
  id: number;
  image: string;
  selected: boolean;
}

export interface User {
  username: string;
  board: BoardItem[];
  ready: boolean;
  host: boolean;
}
