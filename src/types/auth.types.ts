export type User = {
  id: number;
  name: string;
  email: string;
};

type HashedUsername = string;
export type UserAuth = {
  username: HashedUsername;
  accessToken: string;
  refreshToken: string;
} & User;

export type UserLoginInputs = {
  email: string;
  password: string;
};

export type UserSignUpInputs = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  birthdate: string;
};