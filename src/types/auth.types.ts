export type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
};

export type CompanyUser = User & {
  blockchainPublicKey: string;
  companyId: number;
};

type HashedEmail = string;
export type UserAuth = {
  email: HashedEmail;
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
  birthdayDate: string;
};

export type CompanyUserSignUpInputs = UserSignUpInputs & {
  blockchainPublicKey: string;
};