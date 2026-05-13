import { getSiteBundle } from "@/lib/site-content";
import { PageFrame } from "@/components/page-frame";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const { profile } = await getSiteBundle();
  return (
    <div className="noise mesh-bg flex min-h-screen flex-col text-zinc-100">
      <SiteHeader siteTitle={profile.siteTitle} />
      <PageFrame>{children}</PageFrame>
      <SiteFooter profile={profile} />
    </div>
  );
}
