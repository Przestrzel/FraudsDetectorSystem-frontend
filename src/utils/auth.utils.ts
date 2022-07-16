import Cookies from 'js-cookie';

const TOKEN_KEY = '__token__';
const MAX_TOKEN_EXPIRE_TIME = 2147483647;

const getAuthToken = () => Cookies.get(TOKEN_KEY);

const setAuthToken = (token: string) => {
  Cookies.set(TOKEN_KEY, token, {
    expires: MAX_TOKEN_EXPIRE_TIME
  });
};

export { getAuthToken, setAuthToken };