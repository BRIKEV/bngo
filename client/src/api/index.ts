import axios from 'axios';

export const joinGame = (gameKey: string, username: string, gameName: string) => {
  return axios.post<{ accessKey: string }>('/api/v1/game/join', {
    gameKey,
    username,
    gameName,
  });
};
