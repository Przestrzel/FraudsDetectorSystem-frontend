export const apiUrl = 'localhost:8080';

const routes = {
  home: '/',
  login: '/login',
  forgotPassword: '/forgot-password',
  changePassword: '/change-password',
  signUp: '/sign-up',
  auctions: '/auctions',
  addAuction: '/auctions/add'
};

const NOTIFICATION_DURATION = 3_000;
const NOTIFICATION_SNACK_LENGTH = 4;

export { routes, NOTIFICATION_DURATION, NOTIFICATION_SNACK_LENGTH };