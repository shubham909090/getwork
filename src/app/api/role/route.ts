// src/app/api/getUserRole/route.ts


import { getRoleByEmail } from '@/app/server/auth';
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await auth();
  if(!session){
    return NextResponse.json("NONE");
  }
  const role = await getRoleByEmail(session?.user?.email);
  return NextResponse.json({ role });
}

