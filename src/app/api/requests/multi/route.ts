import { NextRequest, NextResponse } from "next/server";

import {
  requestSchema,
  Request,
} from "@/shared/validators/schema";
import { AResponse, erMessage, Message, RStatus } from "@/contants";
import prisma from "../../../../../prisma/client";

const tag = "request";

export async function POST(request: NextRequest) {
  const { data } = await request.json();
  console.log("data ; ", data);
  if (!Array.isArray(data)) {
    return AResponse([], erMessage("Invalid data format. Expected an array."),401);
  }

  const isValidEntries = data.every(
    (entry) => requestSchema.safeParse(entry).success
  );
  console.log(isValidEntries);
  if (!isValidEntries) {
    return AResponse(isValidEntries, erMessage("Some entries have invalid formats."),401);
  }

  const createdData = await prisma.request.createMany({
    data: data.map((entry: Request) => entry),
  });

  return AResponse(createdData, Message(tag, RStatus.CREATED));
}
