/* eslint-disable no-undef */
export const apiUrl = process.env.REACT_APP_API_URL;
export const ganacheUrl = process.env.REACT_APP_GANACHE_URL;
export const contractAddress = process.env.REACT_APP_CONTRACT_ADRESS;

const routes = {
  home: '/',
  login: '/login',
  signUp: '/sign-up',
  signUpCompany: '/sign-up/company',
  signUpOrganisation: '/sign-up/organisation',
  forgotPassword: '/forgot-password',
  changePassword: '/change-password',
  auctions: '/auctions',
  addAuction: '/auctions/add'
};

const endpoints = {
  login: '/api/login',
  logout: '/logout',
  registerUser: '/api/user/saveUser',
  refreshToken: '/api/token/refresh',
  signUpOrganisation: '/api/governmentInstitutions/save',
  signUpCompany: '/api/bidders/save',
  auctions: {
    index: '/api/auctionsPaged',
    detail: '/api/auctions',
  }
};

const NOTIFICATION_DURATION = 2_000;
const NOTIFICATION_SNACK_LENGTH = 4;

export const cityOptions = [
  { label: 'Łomża', value: 'Łomża' },
  { label: 'Mława', value: 'Mława' },
  { label: 'Lubawa', value: 'Lubawa' },
  { label: 'Grudziądz', value: 'Grudziądz' },
  { label: 'Gdańsk', value: 'Gdańsk' },
];

export { endpoints, routes, NOTIFICATION_DURATION, NOTIFICATION_SNACK_LENGTH };