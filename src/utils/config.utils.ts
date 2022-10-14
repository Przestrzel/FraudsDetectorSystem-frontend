/* eslint-disable no-undef */
export const apiUrl = process.env.REACT_APP_API_URL;
export const ganacheUrl = process.env.REACT_APP_GANACHE_URL;
export const contractAddress = process.env.REACT_APP_CONTRACT_ADRESS;

const routes = {
  home: '/',
  login: '/login',
  signUp: '/sign-up',
  forgotPassword: '/forgot-password',
  changePassword: '/change-password',
  auctions: '/auctions',
  addAuction: '/auctions/add'
};

const endpoints = {
  login: '/api/login',
  registerUser: '/api/user/saveUser',
  logout: '/api/logout',
  refreshToken: '/api/token/refresh',
  auctions: {
    index: '/api/auctionsPaged',
    detail: '/api/auctions',
  }
};

const NOTIFICATION_DURATION = 2_000;
const NOTIFICATION_SNACK_LENGTH = 4;

export { endpoints, routes, NOTIFICATION_DURATION, NOTIFICATION_SNACK_LENGTH };