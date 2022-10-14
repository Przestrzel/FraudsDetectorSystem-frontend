/* eslint-disable camelcase */
export type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
  birthdayDate: Date;
};

export type CompanyUser = User & {
  companyName?: string;
  NIP?: number;
  KRS?: number;
  institutionName?: string;
  city?: string;
  postalCode?: string;
  isOrganization?: boolean;
};

type HashedEmail = string;
export type UserAuth = {
  email: HashedEmail;
  access_token: string;
  refresh_token: string;
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