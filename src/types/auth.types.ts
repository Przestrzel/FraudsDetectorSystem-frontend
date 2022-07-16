export type User = {
  name: string;
  email: string;
  id: number;
};

export type UserAuth = {
  token: string;
} & User;
