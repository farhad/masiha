import mysql from "mysql2/promise";

export const databaseConfig = {
  host: process.env.MYSQL_HOST ?? "127.0.0.1",
  port: Number(process.env.MYSQL_PORT ?? 3306),
  user: process.env.MYSQL_USER ?? "root",
  password: process.env.MYSQL_PASSWORD ?? "",
  database: process.env.MYSQL_DATABASE ?? "masiha",
};

export function createPool() {
  return mysql.createPool({
    ...databaseConfig,
    waitForConnections: true,
    connectionLimit: 10,
    namedPlaceholders: true,
  });
}

export type ContentKind =
  | "bible_passage"
  | "journey_lesson"
  | "study_theme_day"
  | "daily_liturgy"
  | "year_plan_day";

export async function getPublishedContent(kind: ContentKind) {
  const pool = createPool();
  const [rows] = await pool.execute(
    `select id, slug, title, body, metadata
     from content_items
     where kind = :kind and status = 'published'
     order by sort_order asc, id asc`,
    { kind },
  );
  await pool.end();
  return rows;
}
