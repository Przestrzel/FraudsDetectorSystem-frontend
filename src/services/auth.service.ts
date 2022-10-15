import { UserLoginInputs, UserSignUpInputs } from 'types/auth.types';
import { endpoints } from 'utils/config.utils';
import http from 'utils/http.utils';

const login = (data: UserLoginInputs) => {
  return http.post(`${ endpoints.login }`, data);
};

const signUp = (data: UserSignUpInputs) => {
  return http.post(endpoints.registerUser, data)
    .then(res => res);
};

const signUpCompany = (data, id) => {
  return http.post(endpoints.signUpCompany, data, {
    params: { id }
  }).then(res => res);
};

const signUpOrganisation = (data, id) => {
  return http.post(endpoints.signUpOrganisation, data, {
    params: { id }
  }).then(res => res);
};

const logout = () => {
  return http.post(endpoints.logout).then(res => res);
};

const refresh = (refreshToken: string) => {
  return http.post(endpoints.refreshToken, { refreshToken });
};

export { login,
  signUp,
  logout,
  refresh,
  signUpOrganisation,
  signUpCompany
};
