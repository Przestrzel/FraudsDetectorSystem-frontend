import { User } from 'types/auth.types';

const login = (): Promise<User> => {
  return Promise.resolve({
    name: 'name',
    email: 'example@example.com',
    id: 0,
    token: 'mocked__token'
  });
};

export { login };
