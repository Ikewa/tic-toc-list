const express = require('express');
const { pool } = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM todos');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.post('/', async (req, res) => {
  const { task, time } = req.body;

  if (!task || !time) {
    return res.status(400).json({ error: 'Task and time are required' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO todos (task, time) VALUES (?, ?)',
      [task, time]
    );
    res.status(201).json({ id: result.insertId, task, time });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add todo' });
  }
});

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
