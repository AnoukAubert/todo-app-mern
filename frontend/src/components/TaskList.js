import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <ul className="mt-4 space-y-4">
      <AnimatePresence>
        {tasks.map(task => (
          <motion.li
            key={task._id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="bg-white shadow-md rounded-lg p-4 flex justify-between items-start"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => onEdit(task)}
                className="text-blue-600 hover:underline"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(task._id)}
                className="text-red-600 hover:underline"
              >
                Eliminar
              </button>
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}

export default TaskList;
