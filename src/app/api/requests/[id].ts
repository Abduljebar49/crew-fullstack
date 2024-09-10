import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { AResponse, Message, RStatus } from "@/contants";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  //   const { token } = params;

  const id = searchParams.get("id");

  let data: any;
  if (id) {
    data = await prisma.request.findMany({
      where: { userId: parseInt(id) },
    });
  } else {
    data = await prisma.request.findMany();
  }
  return AResponse(data, Message("Requests", RStatus.SUCCESS));
}
