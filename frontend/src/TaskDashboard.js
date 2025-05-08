import React, { useState, useEffect } from "react";
import { getTasks, createTask, deleteTask } from "./api";

function TaskDashboard({ token }) {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks(token);
        setTasks(fetchedTasks);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    fetchTasks();
  }, [token]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;

    try {
      const newTask = await createTask({ text: taskText }, token);
      setTasks((prev) => [...prev, newTask]);
      setTaskText("");
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id, token);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div className="task-dashboard">
      <form onSubmit={handleCreateTask}>
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Nueva tarea..."
        />
        <button type="submit">Agregar tarea</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.text}
            <button onClick={() => handleDeleteTask(task._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskDashboard;
