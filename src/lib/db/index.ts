import Database from "better-sqlite3";

export const db = new Database("pacoupa.db");
// db.pragma("journal_mode = WAL");
