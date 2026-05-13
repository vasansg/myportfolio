import type { Profile } from "@/lib/default-site-content";

export function SiteFooter({ profile }: { profile: Profile }) {
  return (
    <footer className="relative z-10 border-t border-white/10 py-10 text-center text-sm text-zinc-500">
      <p>{profile.footerLine}</p>
      <p className="mt-2 text-xs text-zinc-600">Built with Next.js · Tailwind CSS v4 · Framer Motion · mysql2</p>
    </footer>
  );
}
