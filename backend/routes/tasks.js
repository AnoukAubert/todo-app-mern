const express = require('express');

const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Task = require('../models/Task');

router.get('/', auth, async (req, res) => {
  const tasks = await Task.find({ owner: req.user.id });
  res.json(tasks);
});

router.post('/', auth, async (req, res) => {
  const task = await Task.create({ ...req.body, owner: req.user.id });
  res.status(201).json(task);
});

router.patch('/:id', auth, async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, owner: req.user.id },
    req.body,
    { new: true }
  );
  if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
  res.json(task);
});

router.delete('/:id', auth, async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
  if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
  res.json({ message: 'Tarea eliminada' });
});

module.exports = router;