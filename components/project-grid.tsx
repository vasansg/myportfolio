"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import type { ProjectRow } from "@/lib/data";

export function ProjectGrid({ projects }: { projects: ProjectRow[] }) {
  const [motionReady, setMotionReady] = useState(false);
  useEffect(() => setMotionReady(true), []);
  const prefers = useReducedMotion();
  const reduceMotion = motionReady && Boolean(prefers);

  return (
    <div className="grid auto-rows-fr gap-4 md:grid-cols-6">
      {projects.map((p, i) => (
        <motion.article
          key={p.id}
          layout
          className={`group relative flex flex-col overflow-hidden rounded-2xl bg-white/[0.04] p-6 ring-1 ring-white/10 transition ${
            i === 0 ? "md:col-span-4" : "md:col-span-2"
          }`}
          whileHover={reduceMotion ? undefined : { scale: 1.01 }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-0 blur-2xl transition group-hover:opacity-100">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-500/20" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-violet-600/20" />
          </div>
          <div className="relative flex flex-1 flex-col">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h3 className="font-[family-name:var(--font-syne)] text-xl font-semibold text-white">{p.title}</h3>
              {p.featured ? (
                <span className="rounded-full bg-cyan-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-cyan-200 ring-1 ring-cyan-500/30">
                  Featured
                </span>
              ) : null}
            </div>
            <p className="flex-1 text-sm leading-relaxed text-zinc-400">{p.description}</p>
            {p.tech_stack ? (
              <p className="mt-4 text-xs font-medium uppercase tracking-wider text-zinc-500">{p.tech_stack}</p>
            ) : null}
            <div className="mt-4 flex flex-wrap gap-2">
              {p.live_url ? (
                p.live_url.startsWith("/") ? (
                  <Link
                    href={p.live_url}
                    className="rounded-full bg-cyan-400/15 px-3 py-1.5 text-xs font-semibold text-cyan-100 ring-1 ring-cyan-400/30 transition hover:bg-cyan-400/25"
                  >
                    Open
                  </Link>
                ) : (
                  <a
                    href={p.live_url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-cyan-400/15 px-3 py-1.5 text-xs font-semibold text-cyan-100 ring-1 ring-cyan-400/30 transition hover:bg-cyan-400/25"
                  >
                    Live
                  </a>
                )
              ) : null}
              {p.repo_url ? (
                <a
                  href={p.repo_url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-white/5 px-3 py-1.5 text-xs font-semibold text-zinc-200 ring-1 ring-white/10 transition hover:bg-white/10"
                >
                  Repository
                </a>
              ) : null}
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
