import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";
import { getSiteBundle, mergeSiteBundle } from "@/lib/site-content";
import type { SiteBundle } from "@/lib/default-site-content";

export async function GET() {
  const bundle = await getSiteBundle();
  return NextResponse.json(bundle);
}
export async function PUT(req: Request) {
  const pool = getPool();  if (!pool) return NextResponse.json({ error: "Database not configured" }, { status: 503 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const merged = mergeSiteBundle(body);
  const json = JSON.stringify(merged satisfies SiteBundle);

  try {
    await pool.execute(
      `INSERT INTO site_content (slug, data_json) VALUES ('main', ?)
       ON DUPLICATE KEY UPDATE data_json = VALUES(data_json), updated_at = CURRENT_TIMESTAMP`,
      [json]
    );
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Save failed" }, { status: 500 });
  }
}
