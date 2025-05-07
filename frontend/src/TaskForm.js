import React, { useState, useEffect } from "react";

function TaskForm({ onSubmit, initialData }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-md shadow-md">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título de la tarea"
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-violet-600"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción (opcional)"
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-violet-600"
      />
      <button
        type="submit"
        className="w-full py-2 bg-violet-900 text-white rounded hover:bg-violet-950 transition">
        {initialData ? "Actualizar Tarea" : "Crear Tarea"}
      </button>
    </form>
  );
}

export default TaskForm;
