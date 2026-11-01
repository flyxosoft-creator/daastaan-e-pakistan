import { NextResponse } from 'next/server';

export async function GET() {
  // Returns empty session object for unauthenticated visitors
  return NextResponse.json(null);
}

export async function POST() {
  return NextResponse.json(null);
}

