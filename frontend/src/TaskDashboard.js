import React, { useState, useEffect } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "./api";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";

function TaskDashboard({ token, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks(token);
        setTasks(data);
      } catch (err) {
        setErrorMsg("Error al cargar las tareas");
      }
    };
    fetchTasks();
  }, [token]);

  const handleCreateTask = async (newTask) => {
    if (!newTask.trim()) return;
    try {
      const data = await createTask(token, { title: newTask });
      setTasks((prev) => [...prev, data]);
    } catch (err) {
      setErrorMsg("Error al crear la tarea");
    }
  };

  const handleToggleTask = async (task) => {
    try {
      const updatedTask = await updateTask(token, task._id, {
        completed: !task.completed,
      });
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? updatedTask : t))
      );
    } catch (err) {
      setErrorMsg("Error al actualizar la tarea");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("¿Seguro que quieres eliminar esta tarea?")) return;
    try {
      await deleteTask(token, taskId);
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    } catch (err) {
      setErrorMsg("Error al eliminar la tarea");
    }
  };

  return (
    <main className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Tus Tareas</h2>
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}

      <TaskForm onCreate={handleCreateTask} />
      <TaskList tasks={tasks} onToggle={handleToggleTask} onDelete={handleDeleteTask} />

      <button
        onClick={onLogout}
        className="w-full mt-4 bg-red-600 text-white py-2 rounded hover:bg-red-700"
      >
        Cerrar sesión
      </button>
    </main>
  );
}

export default TaskDashboard;
