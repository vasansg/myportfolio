import { getExpectedAdminEmail, getExpectedAdminPassword } from "@/lib/admin-env";

export function verifyAdminLogin(email: string, password: string): boolean {
  const e = getExpectedAdminEmail();
  const p = getExpectedAdminPassword();
  if (!e || !p) return false;
  return email.trim().toLowerCase() === e.trim().toLowerCase() && password === p;
}
