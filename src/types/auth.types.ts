export type User = {
  name: string;
  email: string;
  id: number;
};

export type UserAuth = {
  token: string;
} & User;

export type UserLoginInputs = {
  email: string;
  password: string;
};