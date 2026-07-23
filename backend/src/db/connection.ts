import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const DB_PATH = process.env.DATABASE_PATH || './data/ai-office.db';

mkdirSync(dirname(DB_PATH), { recursive: true });

// Node's built-in SQLite (stable since Node 22) — deliberately used instead
// of better-sqlite3 so the backend never needs to compile a native addon at
// deploy time. That compilation step failed in Railway's build image.
export const db = new DatabaseSync(DB_PATH);
db.exec('PRAGMA journal_mode = WAL');
db.exec('PRAGMA foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    notes TEXT NOT NULL DEFAULT '',
    brand TEXT NOT NULL DEFAULT 'mtech',
    status TEXT NOT NULL DEFAULT 'not-started',
    priority TEXT NOT NULL DEFAULT 'medium',
    deadline TEXT,
    start_date TEXT,
    campaign_id TEXT,
    created_at TEXT NOT NULL,
    completed_at TEXT,
    previous_status TEXT,
    history TEXT NOT NULL DEFAULT '[]',
    approval_required INTEGER NOT NULL DEFAULT 0,
    approver TEXT,
    blocker_reason TEXT,
    last_brief_generated TEXT,
    source TEXT,
    source_conversation_id TEXT
  );

  CREATE TABLE IF NOT EXISTS campaigns (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    brand TEXT NOT NULL DEFAULT 'mtech',
    primary_industry TEXT NOT NULL DEFAULT '',
    secondary_industry TEXT NOT NULL DEFAULT '',
    theme TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'planning',
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    budget REAL,
    spend REAL NOT NULL DEFAULT 0,
    conversions INTEGER NOT NULL DEFAULT 0,
    leads INTEGER NOT NULL DEFAULT 0,
    engagement REAL NOT NULL DEFAULT 0,
    colour TEXT NOT NULL DEFAULT '#3B82F6',
    reactive INTEGER NOT NULL DEFAULT 0,
    notes TEXT NOT NULL DEFAULT ''
  );

  CREATE TABLE IF NOT EXISTS audit_log (
    id TEXT PRIMARY KEY,
    action TEXT NOT NULL,
    resource_type TEXT NOT NULL,
    resource_id TEXT,
    previous_value TEXT,
    new_value TEXT,
    source TEXT NOT NULL,
    source_conversation_id TEXT,
    request_id TEXT,
    confirmed INTEGER NOT NULL DEFAULT 1,
    automatic INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS idempotency_keys (
    request_id TEXT PRIMARY KEY,
    action TEXT NOT NULL,
    response TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_tasks_campaign_id ON tasks(campaign_id);
  CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
  CREATE INDEX IF NOT EXISTS idx_audit_log_resource ON audit_log(resource_type, resource_id);
  CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON audit_log(created_at);
`);

export default db;
