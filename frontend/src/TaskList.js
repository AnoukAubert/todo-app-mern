import React from "react";
import { motion, AnimatePresence } from "framer-motion";

function TaskList({ tasks, onToggle, onDelete }) {
  return (
    <AnimatePresence>
      {tasks.length ? (
        tasks.map((task) => (
          <motion.div
            key={task._id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex items-center justify-between mb-2 p-2 border rounded"
          >
            <span
              className={`flex-1 cursor-pointer ${
                task.completed ? "line-through text-gray-500" : ""
              }`}
              onClick={() => onToggle(task)}
            >
              {task.title}
            </span>
            <button
              onClick={() => onDelete(task._id)}
              className="text-red-500 hover:text-red-700"
            >
              Eliminar
            </button>
          </motion.div>
        ))
      ) : (
        <p className="text-gray-500 text-center mt-4">No hay tareas aún.</p>
      )}
    </AnimatePresence>
  );
}

export default TaskList;
