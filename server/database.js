// database.js
// This file creates the SQLite connection and makes sure the "records" table exists.
// It runs once when the server starts. The database file is created automatically
// in the same folder as this file (server/database.sqlite).

const Database = require('better-sqlite3');
const path = require('path');

// Path to the database file: server/database.sqlite
const dbPath = path.join(__dirname, 'database.sqlite');

// Open (or create) the SQLite database file
const db = new Database(dbPath);

// Optional: slightly faster writes for a small app
db.pragma('journal_mode = WAL');

// Create the "records" table if it does not exist yet.
// is_active is stored as INTEGER (1 = true, 0 = false) because SQLite has no boolean type.
db.exec(`
  CREATE TABLE IF NOT EXISTS records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    is_active INTEGER NOT NULL DEFAULT 0
  );
`);

console.log('Connected to SQLite database at:', dbPath);

// Export the db object so server.js can run queries with it
module.exports = db;
