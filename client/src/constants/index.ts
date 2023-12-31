
export const NOT_VALID_VALUES = [null, undefined, '', []];

export const COOKIE_GAME_KEY = 'game_key';
export const SESSION_RESULTS_KEY = 'results';

export const cookieOptions = (): Cookies.CookieAttributes => {
  if (process.env.NODE_ENV === 'production') {
    return {
      secure: true,
      sameSite: 'lax',
    };
  }
  return {};
};
