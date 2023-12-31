import { COOKIE_GAME_KEY, SESSION_RESULTS_KEY } from '../constants';
import persistence from '.';

const cookieStorage = persistence();

const setAccess = (accessKey: string) => {
  cookieStorage.setItem(COOKIE_GAME_KEY, accessKey);
};

const removeSessionStorage = () => {
  sessionStorage.removeItem(SESSION_RESULTS_KEY);
};

const logout = (route = '/') => {
  cookieStorage.removeItem(COOKIE_GAME_KEY);
  removeSessionStorage();
  window.location.href = route;
};

const getInfo = () => {
  const accessKey = cookieStorage.getItem(COOKIE_GAME_KEY);
  return {
    accessKey,
  };
};

const hasAccess = () => {
  const { accessKey } = getInfo();
  return !!accessKey;
};

export {
  setAccess,
  logout,
  removeSessionStorage,
  hasAccess,
  getInfo,
};
