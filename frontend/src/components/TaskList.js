import React from 'react';

function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <ul className="mt-4 space-y-4">
      {tasks.map(task => (
        <li key={task._id} className="bg-white shadow-md rounded-lg p-4 flex justify-between items-start">
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
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
