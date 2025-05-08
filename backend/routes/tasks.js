const express = require('express');

const router = express.Router();
const {
  getTasks, createTask, updateTask, deleteTask,
} = require('../controllers/taskController');

// eslint-disable-next-line no-undef
router.get('/', authMiddleware, getTasks);
// eslint-disable-next-line no-undef
router.post('/', authMiddleware, createTask);
// eslint-disable-next-line no-undef
router.put('/:id', authMiddleware, updateTask);
// eslint-disable-next-line no-undef
router.delete('/:id', authMiddleware, deleteTask);

module.exports = router;
