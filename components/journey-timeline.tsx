"use client";

import { motion } from "framer-motion";
import type { JourneyEntry } from "@/lib/default-site-content";

export function JourneyTimeline({ journey, intro }: { journey: JourneyEntry[]; intro: string }) {
  return (
    <div>
      <h1 className="font-[family-name:var(--font-syne)] text-4xl font-bold text-white md:text-5xl">Journey</h1>
      <p className="mt-4 max-w-2xl text-lg text-zinc-400">{intro}</p>
      <div className="relative mt-12 pl-6 md:pl-10">
        <div className="absolute bottom-2 left-[11px] top-2 w-px bg-gradient-to-b from-cyan-500/60 via-white/20 to-violet-500/60 md:left-[19px]" />
        <ul className="space-y-8">
          {journey.map((j, idx) => (
            <motion.li
              key={`${j.year}-${idx}`}
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: idx * 0.07, duration: 0.45 }}
              className="relative"
            >
              <span className="absolute -left-6 top-1.5 flex h-3 w-3 items-center justify-center md:-left-10 md:h-4 md:w-4">
                <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 shadow-lg shadow-cyan-500/40 ring-2 ring-slate-950 md:h-3 md:w-3" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/90">{j.year}</p>
              <h2 className="mt-1 font-[family-name:var(--font-syne)] text-lg font-semibold text-white">{j.title}</h2>
              <p className="mt-2 max-w-2xl text-sm text-zinc-400">{j.detail}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
