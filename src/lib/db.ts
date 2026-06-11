import { createClient } from '@libsql/client';
import type { Client, ResultSet } from '@libsql/client';
import path from 'path';

let db: Client | null = null;
let initPromise: Promise<void> | null = null;

export async function getDb(): Promise<Client> {
  if (db) return db;

  const url = process.env.TURSO_DATABASE_URL;
  const token = process.env.TURSO_AUTH_TOKEN;

  if (url) {
    db = createClient({ url, authToken: token });
  } else {
    const dbPath = path.join(process.cwd(), 'data', 'black-force.db');
    db = createClient({ url: `file:${dbPath}` });
  }

  await initTables();
  return db;
}

async function initTables() {
  if (initPromise) return initPromise;

  initPromise = (async () => {
    await db!.execute(`
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        address TEXT NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        notes TEXT,
        status TEXT NOT NULL DEFAULT 'pending',
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `);

    await db!.execute(`
      CREATE TABLE IF NOT EXISTS admins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      )
    `);

    const result = await db!.execute('SELECT COUNT(*) as c FROM admins');
    if (Number(result.rows[0]?.c ?? 0) === 0) {
      await db!.execute('INSERT INTO admins (username, password) VALUES (?, ?)', ['admin', 'bf@2026']);
    }
  })();

  return initPromise;
}
