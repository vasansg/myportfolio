"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/journey", label: "Journey" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader({ siteTitle }: { siteTitle: string }) {
  const pathname = usePathname();
  const [mobileNav, setMobileNav] = useState(false);
  const [motionReady, setMotionReady] = useState(false);
  useEffect(() => setMotionReady(true), []);
  const prefers = useReducedMotion();
  const reduceMotion = motionReady && Boolean(prefers);

  useEffect(() => {
    if (!mobileNav) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileNav(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileNav]);

  const close = useCallback(() => setMobileNav(false), []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl px-4 py-3 glass">
        <Link
          href="/"
          className="font-[family-name:var(--font-syne)] text-lg font-bold tracking-tight text-white transition hover:text-cyan-300"
        >
          {siteTitle}
          <span className="text-cyan-400">.</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} className="relative px-3 py-2 text-sm font-medium">
                {active && !reduceMotion ? (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white/10 ring-1 ring-white/15"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                ) : active ? (
                  <span className="absolute inset-0 -z-10 rounded-full bg-white/10 ring-1 ring-white/15" />
                ) : null}
                <span className={active ? "text-white" : "text-zinc-400 transition hover:text-zinc-200"}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/login"
            className="hidden rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 ring-1 ring-white/10 transition hover:bg-white/10 sm:inline-block"
          >
            Admin
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl ring-1 ring-white/15 lg:hidden"
            aria-expanded={mobileNav}
            aria-controls="mobile-drawer"
            onClick={() => setMobileNav((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <div className="flex w-5 flex-col gap-1">
              <span className={`h-0.5 rounded-full bg-white transition ${mobileNav ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`h-0.5 rounded-full bg-white/70 transition ${mobileNav ? "opacity-0" : ""}`} />
              <span className={`h-0.5 rounded-full bg-white transition ${mobileNav ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileNav && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl glass lg:hidden"
          >
            <div className="flex flex-col p-2">
              {NAV.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    className={`rounded-xl px-4 py-3 text-left text-sm font-medium ${
                      active ? "bg-white/10 text-white" : "text-zinc-300"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/admin/login"
                onClick={close}
                className="rounded-xl px-4 py-3 text-left text-sm font-medium text-cyan-300"
              >
                Admin
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
