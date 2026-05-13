import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, signAdminToken } from "@/lib/admin-token";
import { verifyAdminLogin } from "@/lib/admin-login";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
  const email = typeof body === "object" && body && "email" in body ? String((body as { email: unknown }).email) : "";
  const password =
    typeof body === "object" && body && "password" in body ? String((body as { password: unknown }).password) : "";

  if (!verifyAdminLogin(email, password)) {
    return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
  }

  const token = await signAdminToken(email);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
