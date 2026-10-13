// server.js
// Express backend for the Simple CRUD app.
// It exposes a REST API that the React frontend calls with fetch().
// Every database query uses placeholders (?) so user input can never break the SQL (no SQL injection).

const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());        // allow the React dev server (different port) to call this API
app.use(express.json()); // parse JSON request bodies (req.body)

// ---------------------------------------------------------------
// GET /api/records — retrieve ALL records (newest first)
// ---------------------------------------------------------------
app.get('/api/records', (req, res) => {
  const records = db.prepare('SELECT * FROM records ORDER BY id DESC').all();
  res.json({ success: true, data: records });
});

// ---------------------------------------------------------------
// GET /api/records/:id — retrieve ONE record by its id
// ---------------------------------------------------------------
app.get('/api/records/:id', (req, res) => {
  const record = db.prepare('SELECT * FROM records WHERE id = ?').get(req.params.id);
  if (!record) {
    return res.status(404).json({ success: false, message: 'Record not found' });
  }
  res.json({ success: true, data: record });
});

// ---------------------------------------------------------------
// POST /api/records — create a new record
// ---------------------------------------------------------------
app.post('/api/records', (req, res) => {
  const { name, description, is_active } = req.body;

  // Validate: name is required
  if (!name || !String(name).trim()) {
    return res.status(400).json({ success: false, message: 'Name is required' });
  }

  // Parameterized query: the ? placeholders are filled with the values below
  const info = db
    .prepare('INSERT INTO records (name, description, is_active) VALUES (?, ?, ?)')
    .run(String(name).trim(), description || '', is_active ? 1 : 0);

  // Fetch the newly created row so the frontend gets the auto-generated id
  const record = db.prepare('SELECT * FROM records WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json({ success: true, data: record, message: 'Record created successfully' });
});

// ---------------------------------------------------------------
// PUT /api/records/:id — update an existing record
// ---------------------------------------------------------------
app.put('/api/records/:id', (req, res) => {
  const { name, description, is_active } = req.body;

  const existing = db.prepare('SELECT * FROM records WHERE id = ?').get(req.params.id);
  if (!existing) {
    return res.status(404).json({ success: false, message: 'Record not found' });
  }

  if (!name || !String(name).trim()) {
    return res.status(400).json({ success: false, message: 'Name is required' });
  }

  db.prepare('UPDATE records SET name = ?, description = ?, is_active = ? WHERE id = ?')
    .run(String(name).trim(), description || '', is_active ? 1 : 0, req.params.id);

  const record = db.prepare('SELECT * FROM records WHERE id = ?').get(req.params.id);
  res.json({ success: true, data: record, message: 'Record updated successfully' });
});

// ---------------------------------------------------------------
// DELETE /api/records/:id — delete a record
// ---------------------------------------------------------------
app.delete('/api/records/:id', (req, res) => {
  const info = db.prepare('DELETE FROM records WHERE id = ?').run(req.params.id);
  if (info.changes === 0) {
    return res.status(404).json({ success: false, message: 'Record not found' });
  }
  res.json({ success: true, message: 'Record deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
  console.log(`API base URL: http://localhost:${PORT}/api/records`);
});
