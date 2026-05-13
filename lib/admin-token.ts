import { SignJWT, jwtVerify } from "jose";

export const ADMIN_COOKIE_NAME = "pf_admin";

function secretKey() {
  const s = process.env.SESSION_SECRET || "portfolio-dev-secret-min-32-characters-long-key";
  return new TextEncoder().encode(s);
}

export async function signAdminToken(email: string): Promise<string> {
  return new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(email)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey());
}

export async function verifyAdminToken(token: string | undefined): Promise<string | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    return typeof payload.sub === "string" ? payload.sub : null;
  } catch {
    return null;
  }
}
