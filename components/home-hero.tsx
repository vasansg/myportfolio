"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Profile } from "@/lib/default-site-content";

export function HomeHero({ profile, databaseConnected }: { profile: Profile; databaseConnected: boolean }) {
  const [motionReady, setMotionReady] = useState(false);
  useEffect(() => setMotionReady(true), []);
  const prefers = useReducedMotion();
  const reduceMotion = motionReady && Boolean(prefers);

  return (
    <section className="relative overflow-hidden rounded-3xl ring-1 ring-white/10">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-violet-600/25" />
      <div className="relative grid gap-10 px-6 py-16 md:grid-cols-[1.1fr_0.9fr] md:px-12 md:py-20">
        <div>
          <motion.p
            initial={false}
            animate={reduceMotion ? undefined : { opacity: [0.6, 1], y: [6, 0] }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/90 ring-1 ring-white/10"
          >
            {profile.heroEyebrow}
          </motion.p>
          <h1 className="font-[family-name:var(--font-syne)] text-4xl font-extrabold leading-[1.05] tracking-tight text-white md:text-6xl">
            {profile.heroHeadlineBefore}{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent">
              {profile.heroHeadlineHighlight}
            </span>{" "}
            {profile.heroHeadlineAfter}
          </h1>
          <p className="mt-4 text-sm font-medium text-zinc-500 md:text-base">{profile.roleLine}</p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">{profile.heroSub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="inline-flex rounded-2xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/25 transition hover:scale-[1.02] hover:bg-cyan-300 active:scale-[0.98]"
            >
              {profile.ctaPrimary}
            </Link>
            <Link
              href="/contact"
              className="inline-flex rounded-2xl bg-white/5 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/10 hover:ring-white/25"
            >
              {profile.ctaSecondary}
            </Link>
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          <motion.div
            className="relative aspect-square w-full max-w-sm rounded-[2rem] bg-gradient-to-br from-white/10 to-white/5 p-1 ring-1 ring-white/20"
            animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex h-full w-full flex-col justify-between rounded-[1.85rem] bg-slate-950/80 p-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">{profile.snapshotTitle}</p>
                <p className="mt-2 font-[family-name:var(--font-syne)] text-2xl font-bold text-white">{profile.snapshotSubtitle}</p>
              </div>
              <ul className="space-y-3 text-sm text-zinc-400">
                {profile.snapshotRows.map((row) => (
                  <li
                    key={row.label}
                    className="flex items-center justify-between gap-3 rounded-xl bg-white/5 px-3 py-2 ring-1 ring-white/10"
                  >
                    <span>{row.label}</span>
                    <span className="text-right text-xs font-medium text-emerald-400 md:text-sm">{row.value}</span>
                  </li>
                ))}
                <li className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2 ring-1 ring-white/10">
                  <span>Portfolio MySQL</span>
                  <span className={databaseConnected ? "text-emerald-400" : "text-amber-300"}>
                    {databaseConnected ? "Connected" : "Demo mode"}
                  </span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
