import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, ctx: Ctx) {
  const pool = getPool();
  if (!pool) return NextResponse.json({ error: "No database" }, { status: 503 });
  const id = Number.parseInt((await ctx.params).id, 10);
  if (!Number.isFinite(id)) return NextResponse.json({ error: "bad id" }, { status: 400 });
  const body = (await req.json()) as Partial<{
    name: string;
    category: string;
    proficiency: number;
    icon: string | null;
    sort_order: number;
  }>;
  const fields: string[] = [];
  const vals: (string | number | null)[] = [];
  if (body.name !== undefined) {
    fields.push("name = ?");
    vals.push(body.name);
  }
  if (body.category !== undefined) {
    fields.push("category = ?");
    vals.push(body.category);
  }
  if (body.proficiency !== undefined) {
    fields.push("proficiency = ?");
    vals.push(body.proficiency);
  }
  if (body.icon !== undefined) {
    fields.push("icon = ?");
    vals.push(body.icon);
  }
  if (body.sort_order !== undefined) {
    fields.push("sort_order = ?");
    vals.push(body.sort_order);
  }
  if (!fields.length) return NextResponse.json({ error: "no fields" }, { status: 422 });
  vals.push(id);
  try {
    await pool.execute(`UPDATE skills SET ${fields.join(", ")} WHERE id = ?`, vals);
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
    await pool.execute("DELETE FROM skills WHERE id = ?", [id]);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "delete failed" }, { status: 500 });
  }
}
