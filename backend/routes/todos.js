import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// Get all todos
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM todos');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Add new todo
router.post('/', async (req, res) => {
  const { text, time } = req.body;
  if (!text || !time) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    await pool.query('INSERT INTO todos (text, time) VALUES (?, ?)', [text, time]);
    res.status(201).json({ message: 'Todo created' });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM todos WHERE id = ?', [id]);
    res.status(200).json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;
