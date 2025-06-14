import { registerUser } from "@/../../backend/handlers/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const user = await registerUser(body);
    return NextResponse.json(user, { status: 201 });
  } catch (err) {
    return new NextResponse(err.message, { status: 400 });
  }
}
