import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AResponse } from "@/contants";
import * as jose from "jose";

interface IUser {
  email: string;
  password: string;
}

const prisma = new PrismaClient();
const secretKey = "a";
const encodedSecret = new TextEncoder().encode("ab");

export async function POST(request: NextRequest) {
  const body: IUser = await request.json();
  console.log("body ; ", body);
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    console.log("error : ",user)

    if (user == null || user == undefined) {
      console.log("user ; ")
     return AResponse({
        status: 401,
        body: "Invalid email or password",
      });
      return;
    }

    console.log("sucessfully logged in 1")
    
    const passwordMatch = await bcrypt.compare(body.password, user.password);
    
    if (!passwordMatch) {
      return AResponse({
        status: 401,
        body: "Invalid email or password",
      });
    }
    console.log("sucessfully logged in 2")
    
    const token = await new jose.SignJWT(user)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(encodedSecret);
    
    console.log("sucessfully logged in 3")
    return AResponse({
      message: "Login successful",
      token,
      userId: user.id,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return AResponse({
      status: 500,
      body: "Internal server error",
    });
  }
}
