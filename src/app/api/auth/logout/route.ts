import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  cookieStore.delete("google_id_token");
  return NextResponse.json({ message: "Logout successful" }, { status: 200 });
}
