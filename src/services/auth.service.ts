import { UserLoginInputs, UserSignUpInputs, UserAuth } from 'types/auth.types';
import { endpoints } from 'utils/config.utils';
import http from 'utils/http.utils';

const login = (data: UserLoginInputs): Promise<any> => {
  return http.post(`${ endpoints.login }?email=${ data.email }&password=${ data.password }`);
};

const signUp = (data: UserSignUpInputs) => {
  return http.post(endpoints.registerUser, data)
    .then(res => res);
};

const getUserData = () => {
  return {};
};

const logout = () => {
  return {};
};

export { login, signUp, getUserData, logout };
