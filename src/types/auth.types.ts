/* eslint-disable camelcase */
export type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
  birthdayDate: string;
};

export type CompanyUser = User & {
  companyId?: number;
  institutionId?: number;
  companyName?: string;
  institutionName?: string;
  NIP?: number;
  KRS?: number;
  city?: string;
  postalCode?: string;
  shareholders?: Shareholder[];
  REGON?: number;
  legalForm?: string;
  phoneNumber?: string;
};

type Shareholder = {
  id: number;
  firstName: string;
  lastName: string;
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