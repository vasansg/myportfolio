import { ProjectGrid } from "@/components/project-grid";
import { fetchProjects } from "@/lib/data";
import { getSiteBundle } from "@/lib/site-content";

export default async function ProjectsPage() {
  const [bundle, projects] = await Promise.all([getSiteBundle(), fetchProjects()]);
  const { profile } = bundle;
  return (
    <div>
      <h1 className="font-[family-name:var(--font-syne)] text-4xl font-bold text-white md:text-5xl">Projects</h1>
      <p className="mt-4 max-w-2xl text-lg text-zinc-400">{profile.projectsSectionBlurb}</p>
      <div className="mt-10">
        <ProjectGrid projects={projects} />
      </div>
      <p className="mt-6 text-xs text-zinc-500">
        Tip: set <code className="rounded bg-white/10 px-1">featured = 1</code> in MySQL for highlighted cards.
      </p>
    </div>
  );
}
