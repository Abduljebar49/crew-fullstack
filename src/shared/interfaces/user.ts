export interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  address: string;
  profilePic(optional: string): string;
  isBuyer: boolean;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  address: string;
  token: string;
  isVerified: boolean;
}

export enum UserType {
  ADMIN = "ADMIN",
  IMPORTER = "IMPORTER",
  DISTRIBUTOR = "DISTRIBUTOR",
  SALESPERSON = "SALESPERSON",
}

export interface IUserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: UserType;
}

export interface IUserData {
  email: string;
  fullName: string;
  password: string;
  id: number;
  userType: any;
}

export interface LoginInput {
  email: string;
  password: string;
}
