import mysql from "mysql2/promise";

function env(name: string, fallback?: string): string {
  const v = process.env[name];
  if (v !== undefined && v !== "") return v;
  if (fallback !== undefined) return fallback;
  return "";
}

let pool: mysql.Pool | null = null;
let poolInit = false;

export function getPool(): mysql.Pool | null {
  if (poolInit) return pool;
  poolInit = true;

  if (process.env.PORTFOLIO_SKIP_DB === "1") {
    pool = null;
    return null;
  }

  const host = env("MYSQL_HOST", "127.0.0.1");
  const user = env("MYSQL_USER", "root");
  const password = env("MYSQL_PASSWORD");
  const database = env("MYSQL_DATABASE", "portfolio");
  const port = Number(env("MYSQL_PORT", "3306")) || 3306;

  if (!database) {
    pool = null;
    return null;
  }

  pool = mysql.createPool({
    host,
    port,
    user,
    password,
    database,
    waitForConnections: true,
    connectionLimit: 8,
    namedPlaceholders: true,
  });

  return pool;
}

export async function pingDb(): Promise<boolean> {
  const p = getPool();
  if (!p) return false;
  try {
    const conn = await p.getConnection();
    await conn.ping();
    conn.release();
    return true;
  } catch {
    return false;
  }
}
