import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { AResponse, erMessage, Message, RStatus } from "@/contants";
import {
  requestSchema,
  Request,
  RequestEdit,
  requestEditSchema,
} from "@/shared/validators/schema";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

const tag = "requests";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  const id = searchParams.get("id");
  const userId = searchParams.get("userId");
  let data: any;
  if (userId) {
    data = await prisma.request.findMany({
      where: { userId: parseInt(userId) },
    });
  } else if (id) {
    data = await prisma.request.findMany({
      where: { id: parseInt(id) },
    });
  } else {
    data = await prisma.request.findMany();
  }
  return AResponse(data, Message(tag, RStatus.SUCCESS));
}

export async function POST(request: NextRequest) {
  const body: Request = await request.json();
  const isValid = requestSchema.safeParse(request.body);
  if (!isValid.success)
    AResponse([], erMessage(isValid.error.errors[0].message));
  const data = await prisma.request.create({
    data: body,
  });
  return AResponse(data, Message(tag, RStatus.CREATED));
}

export async function PUT(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const body: RequestEdit = await request.json();
  const isValid = requestEditSchema.safeParse(request.body);
  if (!isValid.success)
    return AResponse([], erMessage(isValid.error.errors[0].message));
  const data = await prisma.request.findUnique({ where: { id: parseInt(id) } });
  if (!data)
    return AResponse([], erMessage("No data found with given id"), 400);
  const newPost = await prisma.request.update({
    where: { id: parseInt(id) },
    data: body,
  });
  return AResponse(newPost, Message(tag, RStatus.UPDATED));
}

export async function DELETE(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const body = await request.json();
  const data = await prisma.request.findUnique({ where: { id: parseInt(id) } });
  if (!data) return AResponse([], erMessage("No data to delete"), 400);

  await prisma.request.delete({ where: { id: parseInt(id) } });
  return AResponse({}, Message(tag, RStatus.DELETED));
}
