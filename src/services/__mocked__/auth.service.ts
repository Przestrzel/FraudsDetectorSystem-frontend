import { UserAuth, UserLoginInputs } from 'types/auth.types';

const login = (data: UserLoginInputs): Promise<UserAuth> => {
  console.log(data);
  return Promise.resolve({
    email: 'example@example.com',
    name: 'name',
    id: 0,
    token: 'mocked__token'
  });
};

export { login };
