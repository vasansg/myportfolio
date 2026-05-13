import { NextResponse } from "next/server";
import { z } from "zod";
import { getPool } from "@/lib/db";

const bodySchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(255),
  subject: z.string().max(200).optional().nullable(),
  message: z.string().min(1).max(8000),
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    const msg = parsed.error.issues.map((i) => i.message).join(" ");
    return NextResponse.json({ ok: false, error: msg }, { status: 422 });
  }

  const pool = getPool();
  if (!pool) {
    return NextResponse.json(
      {
        ok: false,
        error: "Database not configured. Set MYSQL_* in .env.local (see .env.example).",
      },
      { status: 503 }
    );
  }

  const { name, email, subject, message } = parsed.data;

  try {
    await pool.execute(
      "INSERT INTO contact_messages (name, email, subject, message) VALUES (:name, :email, :subject, :message)",
      { name, email, subject: subject ?? null, message }
    );
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: "Could not save message" }, { status: 500 });
  }
}
