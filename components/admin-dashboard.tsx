"use client";

import { useCallback, useEffect, useState } from "react";
import type { ProjectRow, SkillRow } from "@/lib/data";
import type { SiteBundle } from "@/lib/default-site-content";

type Tab = "content" | "skills" | "projects" | "upload";

export function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("content");
  const [json, setJson] = useState("");
  const [skills, setSkills] = useState<SkillRow[]>([]);
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const loadContent = useCallback(async () => {
    const r = await fetch("/api/admin/content");
    if (!r.ok) return;
    const data = (await r.json()) as SiteBundle;
    setJson(JSON.stringify(data, null, 2));
  }, []);

  const loadSkills = useCallback(async () => {
    const r = await fetch("/api/admin/skills");
    if (!r.ok) return;
    setSkills((await r.json()) as SkillRow[]);
  }, []);

  const loadProjects = useCallback(async () => {
    const r = await fetch("/api/admin/projects");
    if (!r.ok) return;
    setProjects((await r.json()) as ProjectRow[]);
  }, []);

  useEffect(() => {
    void loadContent();
    void loadSkills();
    void loadProjects();
  }, [loadContent, loadSkills, loadProjects]);

  async function saveContent() {
    setMsg(null);
    setBusy(true);
    try {
      const parsed = JSON.parse(json) as SiteBundle;
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });
      if (!res.ok) throw new Error("Save failed");
      setMsg("Site copy saved to MySQL.");
      await loadContent();
    } catch {
      setMsg("Invalid JSON or database error.");
    }
    setBusy(false);
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  async function deleteSkill(id: number) {
    if (!confirm("Delete this skill?")) return;
    await fetch(`/api/admin/skills/${id}`, { method: "DELETE" });
    await loadSkills();
  }

  async function deleteProject(id: number) {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    await loadProjects();
  }

  async function handleUpload(file: File) {
    setMsg(null);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = (await res.json()) as { url?: string; error?: string };
    if (data.url) setMsg(`Uploaded: ${data.url}`);
    else setMsg(data.error || "Upload failed");
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "content", label: "Site JSON" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "upload", label: "Upload" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-white md:px-10">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <h1 className="font-[family-name:var(--font-syne)] text-2xl font-bold">Portfolio admin</h1>
        <div className="flex flex-wrap gap-2">
          <a href="/" className="rounded-lg bg-white/10 px-3 py-2 text-sm transition hover:bg-white/15">
            View site
          </a>
          <button
            type="button"
            className="rounded-lg bg-white/10 px-3 py-2 text-sm transition hover:bg-white/15"
            onClick={() => void logout()}
          >
            Log out
          </button>
        </div>
      </div>

      <div className="mx-auto mt-6 flex max-w-5xl flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              tab === t.id ? "bg-cyan-500 text-slate-950" : "bg-white/5 text-zinc-300 ring-1 ring-white/10 hover:bg-white/10"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {msg ? <p className="mx-auto mt-4 max-w-5xl text-sm text-cyan-300">{msg}</p> : null}

      <div className="mx-auto mt-8 max-w-5xl">
        {tab === "content" ? (
          <div className="space-y-4">
            <p className="text-sm text-zinc-400">
              Edit the full JSON bundle <code className="rounded bg-white/10 px-1">profile</code> +{" "}
              <code className="rounded bg-white/10 px-1">journey</code>. Save writes to table{" "}
              <code className="rounded bg-white/10 px-1">site_content</code>.
            </p>
            <textarea
              className="min-h-[420px] w-full rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-sm text-zinc-100"
              value={json}
              onChange={(e) => setJson(e.target.value)}
            />
            <button
              type="button"
              disabled={busy}
              onClick={() => void saveContent()}
              className="rounded-xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 disabled:opacity-50"
            >
              {busy ? "Saving…" : "Save site copy"}
            </button>
          </div>
        ) : null}

        {tab === "skills" ? (
          <SkillsPanel skills={skills} onRefresh={loadSkills} onDelete={deleteSkill} />
        ) : null}

        {tab === "projects" ? (
          <ProjectsPanel projects={projects} onRefresh={loadProjects} onDelete={deleteProject} />
        ) : null}

        {tab === "upload" ? (
          <div className="space-y-4">
            <p className="text-sm text-zinc-400">Images or PDF (max 5MB). Files go to /public/uploads.</p>
            <input
              type="file"
              accept=".png,.jpg,.jpeg,.webp,.gif,.pdf"
              className="text-sm"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void handleUpload(f);
              }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function SkillsPanel({
  skills,
  onRefresh,
  onDelete,
}: {
  skills: SkillRow[];
  onRefresh: () => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("general");
  const [proficiency, setProficiency] = useState(80);
  const [icon, setIcon] = useState("");

  async function addSkill() {
    if (!name.trim()) return;
    await fetch("/api/admin/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        category,
        proficiency,
        icon: icon.trim() || null,
        sort_order: skills.length,
      }),
    });
    setName("");
    setIcon("");
    await onRefresh();
  }

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-white/10 bg-white/5 text-zinc-400">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">%</th>
              <th className="p-3">Icon</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {skills.map((s) => (
              <tr key={s.id} className="border-b border-white/5">
                <td className="p-3 text-zinc-500">{s.id}</td>
                <td className="p-3">{s.name}</td>
                <td className="p-3">{s.category}</td>
                <td className="p-3">{s.proficiency}</td>
                <td className="p-3 text-zinc-400">{s.icon ?? "—"}</td>
                <td className="p-3">
                  <button type="button" className="text-rose-400 hover:underline" onClick={() => void onDelete(s.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap gap-2 rounded-xl border border-white/10 bg-white/5 p-4">
        <input
          placeholder="Name"
          className="min-w-[140px] flex-1 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Category"
          className="w-32 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="number"
          min={0}
          max={100}
          className="w-20 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm"
          value={proficiency}
          onChange={(e) => setProficiency(Number(e.target.value))}
        />
        <input
          placeholder="icon key"
          className="w-28 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
        />
        <button type="button" className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950" onClick={() => void addSkill()}>
          Add skill
        </button>
      </div>
    </div>
  );
}

function ProjectsPanel({
  projects,
  onRefresh,
  onDelete,
}: {
  projects: ProjectRow[];
  onRefresh: () => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tech, setTech] = useState("");
  const [featured, setFeatured] = useState(false);

  async function addProject() {
    if (!title.trim() || !description.trim()) return;
    await fetch("/api/admin/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title.trim(),
        description: description.trim(),
        tech_stack: tech.trim() || null,
        featured: featured ? 1 : 0,
        sort_order: projects.length,
      }),
    });
    setTitle("");
    setDescription("");
    setTech("");
    setFeatured(false);
    await onRefresh();
  }

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-white/10 bg-white/5 text-zinc-400">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Title</th>
              <th className="p-3">Featured</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-b border-white/5 align-top">
                <td className="p-3 text-zinc-500">{p.id}</td>
                <td className="p-3">
                  <div className="font-medium">{p.title}</div>
                  <div className="mt-1 line-clamp-2 text-xs text-zinc-500">{p.description}</div>
                </td>
                <td className="p-3">{p.featured ? "Yes" : "—"}</td>
                <td className="p-3">
                  <button type="button" className="text-rose-400 hover:underline" onClick={() => void onDelete(p.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-4">
        <input
          placeholder="Title"
          className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          rows={3}
          className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          placeholder="Tech stack"
          className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm"
          value={tech}
          onChange={(e) => setTech(e.target.value)}
        />
        <label className="flex items-center gap-2 text-sm text-zinc-300">
          <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
          Featured
        </label>
        <button type="button" className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950" onClick={() => void addProject()}>
          Add project
        </button>
      </div>
    </div>
  );
}
