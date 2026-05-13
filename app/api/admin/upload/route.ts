import { randomBytes } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".pdf"]);

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "file required" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "file too large (max 5MB)" }, { status: 413 });
  }
  const orig = file.name || "upload";
  const ext = path.extname(orig).toLowerCase();
  if (!ALLOWED.has(ext)) {
    return NextResponse.json({ error: "unsupported type" }, { status: 415 });
  }
  const buf = Buffer.from(await file.arrayBuffer());
  const name = `${Date.now()}-${randomBytes(6).toString("hex")}${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  const full = path.join(dir, name);
  await writeFile(full, buf);
  const url = `/uploads/${name}`;
  return NextResponse.json({ ok: true, url });
}
