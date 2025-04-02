import Cookies from 'js-cookie';
import {
  cookieOptions,
  NOT_VALID_VALUES,
} from '../constants';

const options = cookieOptions();

const cookieStorage = {
  setItem: (key: string, value: string) => {
    if (NOT_VALID_VALUES.includes(value)) return;
    Cookies.set(key, value, options);
  },
  getItem: (key: string) => Cookies.get(key) || '',
  removeItem: (key: string) => Cookies.remove(key, options),
};

const storage = () => {
  return cookieStorage;
};

export default storage;
