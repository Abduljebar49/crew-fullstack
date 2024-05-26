import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcrypt";
import {
  User,
  UserEdit,
  userEditSchema,
  userSchema,
  UserType,
} from "@/shared/validators/schema";
import prisma from "../../../../prisma/client";
import { AResponse, erMessage, Message, RStatus } from "@/contants";
const tag = "users";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  const id = searchParams.get("id");

  let data: any;
  if (id) {
    const data = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    if (!data) return AResponse([], erMessage("No user with given ID"), 400);
  } else {
    const userTypeTemp = searchParams.get("userType");
    const userType: UserType = userTypeTemp! as UserType;
    data = await prisma.user.findMany({ where: { userType: userType } });
  }
  return AResponse(data, Message(tag, RStatus.SUCCESS));
}

export async function POST(request: NextRequest) {
  const body: User = await request.json();
  try {
    const isValid = userSchema.safeParse(body);
    if (!isValid.success)
      return AResponse([], erMessage(isValid.error.errors[0].message));

    const salt = await bcrypt.genSaltSync(10, "a");
    body.password = bcrypt.hashSync(body.password, salt);

    const data = await prisma.user.create({
      data: body,
    });
    const response = await fetch("http://localhost:3000/api/email/welcome", {
      method: "POST",
      body: JSON.stringify({ email: body.email, firstName: body.fullName }),
    });
    const result = await response.json();
    console.log(result);

    return AResponse(data, Message(tag, RStatus.SUCCESS));
  } catch (e: any) {
    return AResponse([], erMessage(e.message));
  }
}

export async function PUT(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const body: UserEdit = await request.json();
  console.log("body : ", body);
  const isValid = userEditSchema.safeParse(request.body);
  if (!isValid.success) {
    return AResponse([], erMessage(isValid.error.errors[0].message));
  }

  const data = await prisma.request.findUnique({ where: { id: parseInt(id) } });
  if (data) return AResponse([], erMessage("Duplicate value found"), 400);
  const newPost = await prisma.user.update({
    where: { id: parseInt(id) },
    data: body,
  });
  return AResponse(newPost, Message(tag, RStatus.UPDATED));
}

export async function DELETE(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const data = await prisma.user.findUnique({ where: { id: parseInt(id) } });
  if (!data) return AResponse([], erMessage("No data to delete"), 400);
  await prisma.user.delete({ where: { id: parseInt(id) } });
  return AResponse({}, Message(tag, RStatus.DELETED));
}
