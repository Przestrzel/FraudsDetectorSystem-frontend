export const apiUrl = 'http://localhost:8080';

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
  registerUser: '/api/user/saveNormalUser',
  registerCompanyUser: '/api/user/saveCompanyUser',
  logout: '/api/logout',
};

const NOTIFICATION_DURATION = 3_000;
const NOTIFICATION_SNACK_LENGTH = 4;

export { endpoints, routes, NOTIFICATION_DURATION, NOTIFICATION_SNACK_LENGTH };