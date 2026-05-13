import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function GET() {
  const pool = getPool();
  if (!pool) return NextResponse.json([]);
  try {
    const [rows] = await pool.query(
      "SELECT id, title, description, tech_stack, live_url, repo_url, image_url, featured, sort_order FROM projects ORDER BY sort_order ASC, id ASC"
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
    title?: string;
    description?: string;
    tech_stack?: string | null;
    live_url?: string | null;
    repo_url?: string | null;
    image_url?: string | null;
    featured?: number;
    sort_order?: number;
  };
  if (!body.title || !body.description) return NextResponse.json({ error: "title and description required" }, { status: 422 });
  try {
    const [r] = await pool.execute(
      "INSERT INTO projects (title, description, tech_stack, live_url, repo_url, image_url, featured, sort_order) VALUES (?,?,?,?,?,?,?,?)",
      [
        body.title,
        body.description,
        body.tech_stack ?? null,
        body.live_url ?? null,
        body.repo_url ?? null,
        body.image_url ?? null,
        body.featured ? 1 : 0,
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
