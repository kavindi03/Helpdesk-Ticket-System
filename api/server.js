const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Create Ticket
app.post('/tickets', (req, res) => {
  const { title, description = '', priority } = req.body;

  if (!title || !priority) {
    return res.status(400).json({ error: "Title and priority are required" });
  }

  const query = `
    INSERT INTO Tickets (title, description, priority)
    VALUES (?, ?, ?)
  `;

  db.run(query, [title, description, priority], function (err) {
    if (err) return res.status(500).json({ error: err.message });

    db.get("SELECT * FROM Tickets WHERE id = ?", [this.lastID], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json(row);
    });
  });
});

// Get Tickets (with optional filters)
app.get('/tickets', (req, res) => {
  const { status, priority } = req.query;

  let sql = "SELECT * FROM Tickets";
  const params = [];
  const conditions = [];

  if (status) { conditions.push("status = ?"); params.push(status); }
  if (priority) { conditions.push("priority = ?"); params.push(priority); }

  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ");
  }

  sql += " ORDER BY datetime(createdAt) DESC";

  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json(rows);
  });
});

// Update Status (Resolve Ticket)
app.put('/tickets/:id/status', (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  if (!status) return res.status(400).json({ error: "Status is required" });

  const updateQuery = "UPDATE Tickets SET status = ? WHERE id = ?";

  db.run(updateQuery, [status, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Ticket not found" });

    db.get("SELECT * FROM Tickets WHERE id = ?", [id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(row);
    });
  });
});

// Start Server
const PORT = 4000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
