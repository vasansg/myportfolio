import { SkillGrid } from "@/components/skill-grid";
import { fetchSkills } from "@/lib/data";
import { getSiteBundle } from "@/lib/site-content";

export default async function SkillsPage() {
  const [bundle, skills] = await Promise.all([getSiteBundle(), fetchSkills()]);
  const { profile } = bundle;
  return (
    <div>
      <h1 className="font-[family-name:var(--font-syne)] text-4xl font-bold text-white md:text-5xl">Skills</h1>
      <p className="mt-4 max-w-2xl text-lg text-zinc-400">{profile.skillsSectionBlurb}</p>
      <div className="mt-10">
        <SkillGrid skills={skills} />
      </div>
    </div>
  );
}
