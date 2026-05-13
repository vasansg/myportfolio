import { JourneyTimeline } from "@/components/journey-timeline";
import { getSiteBundle } from "@/lib/site-content";

export default async function JourneyPage() {
  const { profile, journey } = await getSiteBundle();
  return <JourneyTimeline journey={journey} intro={profile.journeyIntro} />;
}
