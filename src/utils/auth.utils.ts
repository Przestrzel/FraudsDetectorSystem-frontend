import Cookies from 'js-cookie';

const TOKEN_KEY = '__token__';
const ACCESS_TOKEN_KEY = `__access${ TOKEN_KEY }`;
const REFRESH_TOKEN_KEY = `__refresh${ TOKEN_KEY }`;
const MAX_TOKEN_EXPIRE_TIME = 2147483647;

const getKey = (isRefresh: boolean) => {
  return isRefresh ? REFRESH_TOKEN_KEY : ACCESS_TOKEN_KEY;
};

const getAuthToken = (isRefresh = false) => Cookies.get(getKey(isRefresh));

const setAuthToken = (token: string, isRefresh = false) => {
  Cookies.set(getKey(isRefresh), token, {
    expires: MAX_TOKEN_EXPIRE_TIME
  });
};

export { getAuthToken, setAuthToken };