import { z } from "zod";

export enum UserType {
  ADMIN = "ADMIN",
  IMPORTER = "IMPORTER",
  DISTRIBUTOR = "DISTRIBUTOR",
  SALESPERSON = "SALESPERSON",
}

const userEnum = z.enum(["ADMIN", "IMPORTER", "DISTRIBUTOR", "SALESPERSON"]);

export interface User {
  id?: number;
  email: string;
  password: string;
  fullName: string;
  userType: UserType;
}

export interface UserEdit {
  id?: number;
  email?: string;
  password?: string;
  fullName?: string;
  userType?: UserType;
}

export interface Request {
  id?: number;
  itemName: string;
  brandName: string;
  amount: number;
  userId: number;
}

export interface RequestEdit {
  id?: number;
  itemName?: string;
  brandName?: string;
  amount?: number;
  userId?: number;
}

const userSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  fullName: z.string(),
  userType: userEnum,
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const userEditSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().optional(),
  fullName: z.string().optional(),
  userType: userEnum.optional(),
});

const requestSchema = z.object({
  itemName: z.string(),
  brandName: z.string(),
  amount: z.number(),
  userId: z.number(),
});

const sendEmailSchema = z.object({});

const requestEditSchema = z.object({
  itemName: z.string().optional(),
  brandName: z.string().optional(),
  amount: z.number().optional(),
  userId: z.number().optional(),
});

export {
  requestSchema,
  userSchema,
  userEditSchema,
  requestEditSchema,
  loginSchema,
  sendEmailSchema,
};
