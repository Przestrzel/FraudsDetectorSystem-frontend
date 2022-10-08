import { UserAuth, UserLoginInputs, UserSignUpInputs } from 'types/auth.types';

const login = (data: UserLoginInputs): Promise<UserAuth> => {
  console.log(data);
  return Promise.resolve({
    email: 'example@example.com',
    name: 'name',
    surname: 'surname',
    id: 0,
    accessToken: 'mocked__token',
    refreshToken: 'mocked__token',
    username: '',
  });
};

const signUp = (data: UserSignUpInputs) => {
  console.log(data);
  return Promise.resolve();
};

const getUserData = () => {
  return Promise.resolve({
    email: 'example@example.com',
    name: 'name',
    surname: 'surname',
    id: 0,
    token: 'mocked__token'
  });
};

const logout = () => {
  return Promise.resolve();
};

export { login, signUp, getUserData, logout };
