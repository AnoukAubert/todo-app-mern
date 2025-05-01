const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ owner: req.user.id });
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  const task = await Task.create({ title, description, owner: req.user.id });
  res.status(201).json(task);
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const updated = await Task.findOneAndUpdate(
    { _id: id, owner: req.user.id },
    req.body,
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: 'Tarea no encontrada' });
  res.json(updated);
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  const deleted = await Task.findOneAndDelete({ _id: id, owner: req.user.id });
  if (!deleted) return res.status(404).json({ message: 'Tarea no encontrada' });
  res.json({ message: 'Tarea eliminada' });
};