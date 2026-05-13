export type JourneyEntry = { year: string; title: string; detail: string };

export type Profile = {
  name: string;
  siteTitle: string;
  roleLine: string;
  email: string;
  phone: string;
  linkedin: string;
  location: string;
  summary: string;
  heroEyebrow: string;
  heroHeadlineBefore: string;
  heroHeadlineHighlight: string;
  heroHeadlineAfter: string;
  heroSub: string;
  ctaPrimary: string;
  ctaSecondary: string;
  snapshotTitle: string;
  snapshotSubtitle: string;
  snapshotRows: { label: string; value: string }[];
  aboutIntro: string;
  aboutStrengths: { title: string; body: string }[];
  experience: {
    title: string;
    company: string;
    location: string;
    period: string;
    bullets: string[];
  };
  certifications: string[];
  achievements: string[];
  skillsSectionBlurb: string;
  projectsSectionBlurb: string;
  journeyIntro: string;
  contactIntro: string;
  footerLine: string;
  cocurricularNote: string;
};

const cocurricular =
  "Active with ITC (2024/25); committee roles including Head Committee for “How Hackers Break Into Networks” (national) and FSKTM Jelajah Industri Digital 2025.";

export const DEFAULT_PROFILE: Profile = {
  name: "Vasanthavanan A/L Kumar",
  siteTitle: "Vasanthavanan",
  roleLine: "Computer Science Intern Candidate · JPA Scholar · Software Engineering Student",
  email: "vasanthavanan12@gmail.com",
  phone: "+60 11-2121 3806",
  linkedin: "https://www.linkedin.com/in/vasanthavanan-kumar-7a2456255",
  location: "Malaysia (UTHM · Batu Pahat / Pagoh, Johor)",
  summary:
    "Motivated JPA Scholar and Software Engineering student seeking a Computer Science internship to apply and expand technical expertise in a real-world environment. Strong in full-stack web development with Laravel and SQL, mobile development with Flutter, and IoT application design—adaptable across software development, systems, data, or IT roles.",
  heroEyebrow: "Open to internships · CS & software engineering",
  heroHeadlineBefore: "I build",
  heroHeadlineHighlight: "full-stack & mobile",
  heroHeadlineAfter: "products end to end.",
  heroSub:
    "From Laravel + MySQL systems and Blade front ends to Flutter apps and IoT pipelines—I care about reliable delivery, clear data models, and interfaces people can actually use.",
  ctaPrimary: "View projects",
  ctaSecondary: "Get in touch",
  snapshotTitle: "At a glance",
  snapshotSubtitle: "UTHM · Software Engineering",
  snapshotRows: [
    { label: "Current focus", value: "BCS Software Engineering (Honours)" },
    { label: "Latest internship", value: "Laravel @ Xentral Methods" },
    { label: "Stack you’ll see here", value: "Laravel · MySQL · Flutter" },
  ],
  aboutIntro:
    "I combine coursework excellence (Dean’s List, CGPA 3.67) with hands-on industry experience: shipping features on a real learning management system, parsing content into digital formats, and building IoT-backed mobile monitoring.",
  aboutStrengths: [
    {
      title: "Web & backend",
      body: "Laravel across front and back end, Blade templates, MySQL queries, bug fixes, and new features—PJLC Learning System at Xentral Methods.",
    },
    {
      title: "Mobile & cloud",
      body: "Flutter applications with Firebase; React Native exposure; comfortable integrating remote data and real-time UI.",
    },
    {
      title: "IoT & systems thinking",
      body: "End-to-end project with rain/moisture sensing, backend processing, and a Flutter app for monitoring and remote control.",
    },
  ],
  experience: {
    title: "Software Development Intern",
    company: "Xentral Methods Sdn. Bhd.",
    location: "Cyberjaya, Selangor",
    period: "Aug 2023 – Jan 2024",
    bullets: [
      "Developed and maintained Laravel web applications across front-end and back-end.",
      "Contributed to the PJLC Learning System—features, bug fixes, and overall reliability.",
      "Converted conventional book content into structured eBooks (parsing & presentation logic).",
    ],
  },
  certifications: [
    "Project Innovation Excellence Showcase in IT 2025",
    "MDEC Freelance",
    "SAS Viya Machine Learning",
    "Foundations of UX Design",
    "Crash Course on Python",
    "Scrabble National Youth Championship 2019",
  ],
  achievements: [
    "Bronze — Agriculture Hackathon 2019",
    "Scrabble Gala Championship 2020",
    "Participation — Rise International Research & Innovation Symposium 2026",
    "Participation — International Global Project-Based Learning 2022",
  ],
  skillsSectionBlurb:
    "Technical skills from my resume; bars are indicative strengths—your MySQL `skills` table can override anytime.",
  projectsSectionBlurb:
    "Highlighted work from internships and university projects. Connect MySQL to manage these rows from phpMyAdmin.",
  journeyIntro: "Education, internship milestones, and community involvement in one timeline.",
  contactIntro:
    "Reach out for internships, final-year projects, or collaboration. Messages can be stored in MySQL (`contact_messages`) when your pool is configured.",
  footerLine: "Vasanthavanan A/L Kumar · Bachelor of Computer Science (Software Engineering), UTHM",
  cocurricularNote: cocurricular,
};

export const DEFAULT_JOURNEY: JourneyEntry[] = [
  {
    year: "2024 — Present",
    title: "Bachelor of Computer Science (Software Engineering) with Honours",
    detail:
      "Universiti Tun Hussein Onn Malaysia (UTHM), Batu Pahat · CGPA 3.67 / 4.00 · Dean’s List · Mar 2024 – Dec 2026 (expected).",
  },
  {
    year: "Aug 2023 – Jan 2024",
    title: "Software Development Intern — Xentral Methods",
    detail: "Laravel full-stack work on PJLC Learning System; eBook conversion tooling; Cyberjaya, Selangor.",
  },
  {
    year: "2021 — 2024",
    title: "Diploma in Information Technology",
    detail: "UTHM, Pagoh, Johor · CGPA 3.40 / 4.00 · Aug 2021 – Jan 2024.",
  },
  {
    year: "Beyond coursework",
    title: "Competitions, certs & community",
    detail: `${cocurricular} Achievements include Bronze — Agriculture Hackathon 2019; Scrabble Gala Championship 2020.`,
  },
];

export type SiteBundle = { profile: Profile; journey: JourneyEntry[] };

export function defaultSiteBundle(): SiteBundle {
  return {
    profile: { ...DEFAULT_PROFILE, experience: { ...DEFAULT_PROFILE.experience, bullets: [...DEFAULT_PROFILE.experience.bullets] } },
    journey: DEFAULT_JOURNEY.map((j) => ({ ...j })),
  };
}
