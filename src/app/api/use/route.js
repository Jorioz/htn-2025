// src/app/api/hello/route.js
import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get('name') ?? 'stranger';
    return NextResponse.json({ message: `Hello ${name}` });
}

export async function POST(req) {
    const body = await req.json();
    return NextResponse.json({ received: body });
}