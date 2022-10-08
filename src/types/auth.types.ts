export type User = {
  id: number;
  name: string;
  email: string;
};

export type CompanyUser = User & {
  blockchainPublicKey: string;
  companyId: number;
};

export enum Roles {
  USER = 'ROLE_USER',
}

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
  name: string;
  surname: string;
  birthdate: string;
};

export type CompanyUserSignUpInputs = UserSignUpInputs & {
  blockchainPublicKey: string;
};