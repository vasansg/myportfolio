import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, ctx: Ctx) {
  const pool = getPool();
  if (!pool) return NextResponse.json({ error: "No database" }, { status: 503 });
  const id = Number.parseInt((await ctx.params).id, 10);
  if (!Number.isFinite(id)) return NextResponse.json({ error: "bad id" }, { status: 400 });
  const body = (await req.json()) as Partial<{
    title: string;
    description: string;
    tech_stack: string | null;
    live_url: string | null;
    repo_url: string | null;
    image_url: string | null;
    featured: number;
    sort_order: number;
  }>;
  const fields: string[] = [];
  const vals: (string | number | null)[] = [];
  const add = (col: string, v: string | number | null | undefined) => {
    if (v === undefined) return;
    fields.push(`${col} = ?`);
    vals.push(v);
  };
  add("title", body.title);
  add("description", body.description);
  add("tech_stack", body.tech_stack ?? undefined);
  add("live_url", body.live_url ?? undefined);
  add("repo_url", body.repo_url ?? undefined);
  add("image_url", body.image_url ?? undefined);
  if (body.featured !== undefined) {
    fields.push("featured = ?");
    vals.push(body.featured ? 1 : 0);
  }
  add("sort_order", body.sort_order);
  if (!fields.length) return NextResponse.json({ error: "no fields" }, { status: 422 });
  vals.push(id);
  try {
    await pool.execute(`UPDATE projects SET ${fields.join(", ")} WHERE id = ?`, vals);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "update failed" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const pool = getPool();
  if (!pool) return NextResponse.json({ error: "No database" }, { status: 503 });
  const id = Number.parseInt((await ctx.params).id, 10);
  if (!Number.isFinite(id)) return NextResponse.json({ error: "bad id" }, { status: 400 });
  try {
    await pool.execute("DELETE FROM projects WHERE id = ?", [id]);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "delete failed" }, { status: 500 });
  }
}
