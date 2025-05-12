const Task = require('../models/Task');

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener las tareas' });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = await Task.create({
      user: req.user.id,
      title,
      description,
    });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear la tarea' });
  }
};

// eslint-disable-next-line consistent-return
const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findOneAndDelete({ _id: taskId, user: req.user.id });

    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    res.status(200).json({ message: 'Tarea eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar la tarea' });
  }
};

module.exports = {
  getTasks,
  createTask,
  deleteTask,
};
