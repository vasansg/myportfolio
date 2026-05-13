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
              <span className="text-amber-200">Configure MYSQL_* to enable saving</span>
            )}
          </li>
        </ul>
      </div>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-500">Name</span>
            <input
              name="name"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none ring-0 transition placeholder:text-zinc-600 focus:border-cyan-500/50 focus:bg-white/[0.07]"
              placeholder="Your name"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-500">Email</span>
            <input
              name="email"
              type="email"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500/50 focus:bg-white/[0.07]"
              placeholder="your.email@example.com"
            />
          </label>
        </div>
        <label className="block text-sm">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-500">Subject</span>
          <input
            name="subject"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500/50 focus:bg-white/[0.07]"
            placeholder="Internship / project / collaboration"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-500">Message</span>
          <textarea
            name="message"
            required
            rows={5}
            className="w-full resize-y rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500/50 focus:bg-white/[0.07]"
            placeholder="Share context, timelines, and how I can help…"
          />
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 disabled:opacity-60"
          >
            {status === "loading" ? "Sending…" : "Send message"}
          </button>
          {status === "success" ? (
            <span className="text-sm font-medium text-emerald-400">Received—thank you!</span>
          ) : null}
          {status === "error" ? <span className="text-sm font-medium text-rose-400">{errorMsg}</span> : null}
        </div>
      </form>
    </div>
  );
}
