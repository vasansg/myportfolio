"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { skillBadge } from "@/lib/skill-badge";
import type { SkillRow } from "@/lib/data";

export function SkillGrid({ skills }: { skills: SkillRow[] }) {
  const [motionReady, setMotionReady] = useState(false);
  useEffect(() => setMotionReady(true), []);
  const prefers = useReducedMotion();
  const reduceMotion = motionReady && Boolean(prefers);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {skills.map((s, idx) => (
        <motion.div
          key={s.id}
          initial={false}
          whileHover={reduceMotion ? undefined : { y: -3 }}
          transition={{ delay: idx * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl bg-white/[0.04] p-5 ring-1 ring-white/10"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/30 to-violet-500/30 text-sm font-bold text-white ring-1 ring-white/10">
                {skillBadge(s.icon)}
              </span>
              <div>
                <p className="font-medium text-white">{s.name}</p>
                <p className="text-xs uppercase tracking-wider text-zinc-500">{s.category}</p>
              </div>
            </div>
            <span className="text-sm font-semibold text-cyan-300">{s.proficiency}%</span>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400"
              initial={false}
              whileInView={reduceMotion ? undefined : { width: `${Math.min(100, Math.max(0, s.proficiency))}%` }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
