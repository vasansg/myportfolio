"use client";

import { motion } from "framer-motion";
import type { Profile } from "@/lib/default-site-content";

export function AboutPageClient({ profile }: { profile: Profile }) {
  return (
    <div>
      <h1 className="font-[family-name:var(--font-syne)] text-4xl font-bold text-white md:text-5xl">About me</h1>
      <p className="mt-4 max-w-2xl text-lg text-zinc-400">{profile.aboutIntro}</p>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {profile.aboutStrengths.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.06, duration: 0.45 }}
            whileHover={{ y: -4 }}
            className="rounded-2xl bg-white/[0.04] p-6 ring-1 ring-white/10"
          >
            <h2 className="font-[family-name:var(--font-syne)] text-lg font-semibold text-white">{card.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">{card.body}</p>
          </motion.div>
        ))}
      </div>
      <motion.section
        className="mt-10 rounded-2xl bg-white/[0.04] p-6 ring-1 ring-white/10"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300/90">{profile.experience.period}</p>
        <h2 className="mt-1 font-[family-name:var(--font-syne)] text-xl font-semibold text-white">
          {profile.experience.title} · {profile.experience.company}
        </h2>
        <p className="text-sm text-zinc-500">{profile.experience.location}</p>
        <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-zinc-400">
          {profile.experience.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </motion.section>
      <div className="mt-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Certifications</p>
        <div className="flex flex-wrap gap-2">
          {profile.certifications.map((c) => (
            <span key={c} className="rounded-full bg-white/5 px-3 py-1.5 text-xs text-zinc-300 ring-1 ring-white/10">
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
