const express = require('express');

const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
// eslint-disable-next-line import/no-unresolved, import/extensions
} = require('../controllers/taskController');

router.get('/', authMiddleware, getTasks);
router.post('/', authMiddleware, createTask);
router.put('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, deleteTask);

module.exports = router;
