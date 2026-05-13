export function skillBadge(icon: string | null) {
  const map: Record<string, string> = {
    laravel: "Lv",
    php: "PHP",
    mysql: "SQL",
    flutter: "Ft",
    dart: "Dt",
    js: "JS",
    python: "Py",
    firebase: "Fb",
    git: "Gt",
    java: "Jv",
    next: "▲",
    react: "⚛",
    ts: "TS",
    tailwind: "〜",
    node: "⬢",
    api: "⇄",
    motion: "✦",
  };
  if (!icon) return "◆";
  return map[icon] ?? icon.slice(0, 2).toUpperCase();
}
