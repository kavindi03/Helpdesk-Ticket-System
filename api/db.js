const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'tickets.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('✗ Database connection error:', err.message);
  } else {
    console.log('✓ Database connected:', dbPath);
  }
});

// Ensure table exists, but don't block on it
db.run(`
  CREATE TABLE IF NOT EXISTS Tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    priority INTEGER NOT NULL CHECK(priority BETWEEN 1 AND 3),
    status TEXT NOT NULL DEFAULT 'OPEN',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`, (err) => {
  if (err) console.error('✗ Table creation error:', err.message);
  else console.log('✓ Tickets table ready');
});

db.on('error', (err) => {
  console.error('✗ Database error:', err.message);
});

module.exports = db;
