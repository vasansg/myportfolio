import { ContactForm } from "@/components/contact-form";
import { pingDb } from "@/lib/db";
import { getSiteBundle } from "@/lib/site-content";

export default async function ContactPage() {
  const { profile } = await getSiteBundle();
  const databaseConnected = await pingDb();
  return (
    <div>
      <h1 className="font-[family-name:var(--font-syne)] text-4xl font-bold text-white md:text-5xl">Contact</h1>
      <p className="mt-4 max-w-2xl text-lg text-zinc-400">{profile.contactIntro}</p>
      <div className="mt-10">
        <ContactForm profile={profile} databaseConnected={databaseConnected} />
      </div>
    </div>
  );
}
