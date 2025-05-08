import React, { useState } from "react";

function TaskForm({ onCreate }) {
  const [newTask, setNewTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(newTask);
    setNewTask("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4 space-x-2">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Nueva tarea"
        className="flex-1 px-3 py-2 border rounded"
      />
      <button
        type="submit"
        className="bg-violet-900 text-white py-2 px-4 rounded hover:bg-violet-950"
      >
        Agregar
      </button>
    </form>
  );
}

export default TaskForm;
