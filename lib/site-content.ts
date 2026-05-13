import {
  DEFAULT_JOURNEY,
  DEFAULT_PROFILE,
  defaultSiteBundle as cloneDefaultBundle,
  type JourneyEntry,
  type Profile,
  type SiteBundle,
} from "@/lib/default-site-content";
import { getPool } from "@/lib/db";

function mergeProfile(base: Profile, patch: Partial<Profile> | undefined): Profile {
  if (!patch) return base;
  return {
    ...base,
    ...patch,
    snapshotRows: patch.snapshotRows ?? base.snapshotRows,
    aboutStrengths: patch.aboutStrengths ?? base.aboutStrengths,
    experience: patch.experience
      ? {
          ...base.experience,
          ...patch.experience,
          bullets: patch.experience.bullets ?? base.experience.bullets,
        }
      : base.experience,
    certifications: patch.certifications ?? base.certifications,
    achievements: patch.achievements ?? base.achievements,
  };
}

export function mergeSiteBundle(raw: unknown): SiteBundle {
  if (!raw || typeof raw !== "object") return cloneDefaultBundle();
  const o = raw as { profile?: Partial<Profile>; journey?: JourneyEntry[] };
  const profile = mergeProfile(DEFAULT_PROFILE, o.profile);
  const journey = Array.isArray(o.journey) && o.journey.length > 0 ? o.journey : DEFAULT_JOURNEY;
  return { profile, journey };
}

export async function getSiteBundle(): Promise<SiteBundle> {
  const pool = getPool();
  if (!pool) return cloneDefaultBundle();
  try {
    const [rows] = await pool.query(
      "SELECT data_json FROM site_content WHERE slug = ? LIMIT 1",
      ["main"]
    );
    const list = rows as { data_json: string | Buffer }[];
    const row = list[0];
    if (!row?.data_json) return cloneDefaultBundle();
    const text = typeof row.data_json === "string" ? row.data_json : row.data_json.toString("utf8");
    const parsed = JSON.parse(text) as unknown;
    return mergeSiteBundle(parsed);
  } catch {
    return cloneDefaultBundle();
  }
}
