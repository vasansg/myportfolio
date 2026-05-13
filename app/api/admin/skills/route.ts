import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function GET() {
  const pool = getPool();
  if (!pool) return NextResponse.json([]);
  try {
    const [rows] = await pool.query(
      "SELECT id, name, category, proficiency, icon, sort_order FROM skills ORDER BY sort_order ASC, id ASC"
    );
    return NextResponse.json(rows);
  } catch {
    return NextResponse.json({ error: "query failed" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const pool = getPool();
  if (!pool) return NextResponse.json({ error: "No database" }, { status: 503 });
  const body = (await req.json()) as {
    name?: string;
    category?: string;
    proficiency?: number;
    icon?: string | null;
    sort_order?: number;
  };
  if (!body.name) return NextResponse.json({ error: "name required" }, { status: 422 });
  try {
    const [r] = await pool.execute(
      "INSERT INTO skills (name, category, proficiency, icon, sort_order) VALUES (?,?,?,?,?)",
      [
        body.name,
        body.category ?? "general",
        body.proficiency ?? 80,
        body.icon ?? null,
        body.sort_order ?? 0,
      ]
    );
    const insertId = (r as { insertId?: number }).insertId;
    return NextResponse.json({ ok: true, id: insertId });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "insert failed" }, { status: 500 });
  }
}
