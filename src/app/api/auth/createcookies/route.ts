import { getServerSession } from "next-auth";
import { authOption } from "../lib/authOption";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export async function GET() {
  const cookieStore = await cookies();
  const existing = cookieStore.get("google_id_token");
  if (existing) {
    return NextResponse.json({ msg: "valid" }, { status: 200 });
  }
  const session = await getServerSession(authOption);
  if (!session || !session.idToken) {
    return NextResponse.json({ error: "No valid session" }, { status: 401 });
  }
  const token = jwt.sign(
    {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      image: session.user.image,
    },
    process.env.NEXTAUTH_SECRET!,
    {
      expiresIn: "15d",
    }
  );
  const response = NextResponse.json({ message: "Cookie created" });
  response.cookies.set("google_id_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    path: "/",
    maxAge: 60 * 60 * 24 * 15,
  });
  return response;
}
