export const apiUrl = process.env.REACT_APP_API_URL;

const routes = {
  home: '/',
  login: '/login',
  forgotPassword: '/forgot-password',
  changePassword: '/change-password',
  signUp: '/sign-up'
};

const NOTIFICATION_DURATION = 5_000;
const NOTIFICATION_SNACK_LENGTH = 5;

export { routes, NOTIFICATION_DURATION, NOTIFICATION_SNACK_LENGTH };