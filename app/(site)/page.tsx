import { HomeHero } from "@/components/home-hero";
import { pingDb } from "@/lib/db";
import { getSiteBundle } from "@/lib/site-content";

export default async function HomePage() {
  const { profile } = await getSiteBundle();
  const databaseConnected = await pingDb();
  return <HomeHero profile={profile} databaseConnected={databaseConnected} />;
}
