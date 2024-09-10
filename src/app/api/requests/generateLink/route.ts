import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { addHours } from 'date-fns';
import { PrismaClient } from "@prisma/client";
import { baseUrl } from '@/contants';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
  }

  const token = uuidv4();
  const expiry = addHours(new Date(), 24); // Set link expiration time, e.g., 24 hours
  const accessLink = `${baseUrl}/access/${token}`;

  try {
    await prisma.link.create({
      data: {
        userId: userId.toString(),
        token,
        expiry,
      },
    });

    return NextResponse.json({ accessLink }, { status: 201 });
  } catch (error) {
    console.error('Error creating access link:', error);
    return NextResponse.json({ error: 'Failed to create access link' }, { status: 500 });
  }
}
