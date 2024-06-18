import { NextRequest, NextResponse } from 'next/server';
import schema, { schemaType } from '../schema';
import prisma from '@/prisma/client';

interface Args {
  params: { id: string };
}

export async function GET(request: NextRequest, { params: { id } }: Args) {
  const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
  if (!user)
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  return NextResponse.json(user);
}

export async function PUT(request: NextRequest, { params: { id } }: Args) {
  const body: schemaType = await request.json();
  const validation = schema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!user)
    return NextResponse.json({ error: 'User not found' }, { status: 400 });

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      email: body.email,
      name: body.name,
    },
  });

  return NextResponse.json(updatedUser);
}

export async function DELETE(request: NextRequest, { params: { id } }: Args) {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!user)
    return NextResponse.json({ error: 'User not found' }, { status: 400 });

  await prisma.user.delete({ where: { id: user.id } });

  return NextResponse.json({}, { status: 200 });
}
