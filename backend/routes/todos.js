const express = require('express');
const { pool } = require('../db');

const router = express.Router(); // ✅ This MUST come before router.get

// GET /todos - fetch all tasks
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM todos');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// POST /todos - add new task
router.post('/', async (req, res) => {
  const { text, time } = req.body;
  try {
    await pool.query('INSERT INTO todos (text, time) VALUES (?, ?)', [text, time]);
    res.status(201).json({ message: 'Todo added' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add todo' });
  }
});

// DELETE /todos/:id - delete task
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM todos WHERE id = ?', [id]);
    res.status(200).json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

module.exports = router;
