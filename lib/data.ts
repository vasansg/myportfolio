import { getPool } from "@/lib/db";

export type SkillRow = {
  id: number;
  name: string;
  category: string;
  proficiency: number;
  icon: string | null;
  sort_order: number;
};

export type ProjectRow = {
  id: number;
  title: string;
  description: string;
  tech_stack: string | null;
  live_url: string | null;
  repo_url: string | null;
  image_url: string | null;
  featured: number;
  sort_order: number;
};

const DEMO_SKILLS: SkillRow[] = [
  { id: 1, name: "Laravel", category: "web", proficiency: 90, icon: "laravel", sort_order: 1 },
  { id: 2, name: "PHP", category: "programming", proficiency: 88, icon: "php", sort_order: 2 },
  { id: 3, name: "MySQL", category: "database", proficiency: 88, icon: "mysql", sort_order: 3 },
  { id: 4, name: "Flutter", category: "mobile", proficiency: 86, icon: "flutter", sort_order: 4 },
  { id: 5, name: "Dart", category: "programming", proficiency: 84, icon: "dart", sort_order: 5 },
  { id: 6, name: "JavaScript", category: "programming", proficiency: 82, icon: "js", sort_order: 6 },
  { id: 7, name: "Python", category: "programming", proficiency: 80, icon: "python", sort_order: 7 },
  { id: 8, name: "Firebase", category: "cloud", proficiency: 78, icon: "firebase", sort_order: 8 },
  { id: 9, name: "Git", category: "tools", proficiency: 86, icon: "git", sort_order: 9 },
  { id: 10, name: "Java", category: "programming", proficiency: 76, icon: "java", sort_order: 10 },
];

const DEMO_PROJECTS: ProjectRow[] = [
  {
    id: 1,
    title: "PJLC Learning System",
    description:
      "Online learning management system at Xentral Methods—Laravel server-side features, MySQL queries, and Blade front-end templates. Shipped features, resolved bugs, and improved reliability.",
    tech_stack: "Laravel · MySQL · Blade · PHP",
    live_url: null,
    repo_url: null,
    image_url: null,
    featured: 1,
    sort_order: 1,
  },
  {
    id: 2,
    title: "Laundry IoT + Flutter",
    description:
      "End-to-end IoT build: rain/moisture sensing hardware, backend data processing, and a Flutter mobile app for real-time monitoring and remote control.",
    tech_stack: "Flutter · IoT · Sensors · Backend pipeline",
    live_url: null,
    repo_url: null,
    image_url: null,
    featured: 1,
    sort_order: 2,
  },
  {
    id: 3,
    title: "eBook conversion tool",
    description:
      "Content processing pipeline to turn traditional printed books into structured digital eBooks—backend parsing plus a user-facing interface for operators.",
    tech_stack: "Parsing · Laravel / web stack · UX for operators",
    live_url: null,
    repo_url: null,
    image_url: null,
    featured: 0,
    sort_order: 3,
  },
];

export async function fetchSkills(): Promise<SkillRow[]> {
  const pool = getPool();
  if (!pool) return DEMO_SKILLS;
  try {
    const [rows] = await pool.query(
      "SELECT id, name, category, proficiency, icon, sort_order FROM skills ORDER BY sort_order ASC, id ASC"
    );
    const list = rows as SkillRow[];
    if (!list.length) return DEMO_SKILLS;
    return list;
  } catch {
    return DEMO_SKILLS;
  }
}

export async function fetchProjects(): Promise<ProjectRow[]> {
  const pool = getPool();
  if (!pool) return DEMO_PROJECTS;
  try {
    const [rows] = await pool.query(
      "SELECT id, title, description, tech_stack, live_url, repo_url, image_url, featured, sort_order FROM projects ORDER BY sort_order ASC, id ASC"
    );
    const list = rows as ProjectRow[];
    if (!list.length) return DEMO_PROJECTS;
    return list;
  } catch {
    return DEMO_PROJECTS;
  }
}
