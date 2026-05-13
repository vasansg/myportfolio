import { AboutPageClient } from "@/components/about-page-client";
import { getSiteBundle } from "@/lib/site-content";

export default async function AboutPage() {
  const { profile } = await getSiteBundle();
  return <AboutPageClient profile={profile} />;
}
