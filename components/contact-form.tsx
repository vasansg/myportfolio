"use client";

import { useState } from "react";
import type { Profile } from "@/lib/default-site-content";

export function ContactForm({ profile, databaseConnected }: { profile: Profile; databaseConnected: boolean }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      subject: String(fd.get("subject") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok?: boolean; error?: unknown };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMsg(typeof data.error === "string" ? data.error : "Something went wrong");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg("Network error");
    }
  }

  return (
    <div className="grid gap-8 rounded-3xl bg-white/[0.03] p-6 ring-1 ring-white/10 md:grid-cols-[1fr_1.1fr] md:p-10">
      <div>
        <h3 className="font-[family-name:var(--font-syne)] text-xl font-semibold text-white">Direct lines</h3>
        <ul className="mt-4 space-y-3 text-sm text-zinc-400">
          <li>
            <span className="text-zinc-500">Email</span>
            <br />
            <a className="text-cyan-300 hover:underline" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </li>
          <li>
            <span className="text-zinc-500">Phone</span>
            <br />
            <a className="text-cyan-300 hover:underline" href={`tel:${profile.phone.replace(/\s/g, "")}`}>
              {profile.phone}
            </a>
          </li>
          <li>
            <span className="text-zinc-500">LinkedIn</span>
            <br />
            <a className="text-cyan-300 hover:underline" href={profile.linkedin} target="_blank" rel="noreferrer">
              Profile
            </a>
          </li>
          <li>
            <span className="text-zinc-500">Location</span>
            <br />
            {profile.location}
          </li>
          <li>
            <span className="text-zinc-500">Database</span>
            <br />
            {databaseConnected ? (
              <span className="text-emerald-300">Ready to store inquiries</span>
            ) : (
              <span className="text-amber-200"> MYSQL</span>
            )}
          </li>
        </ul>
      </div>
      
    </div>
  );
}
