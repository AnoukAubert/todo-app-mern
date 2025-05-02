import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

function TaskDashboard() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('jwt');

  // Cambiá esto en producción si desplegás backend en Render:
  const API_BASE = '/api'; // o 'https://tu-api.onrender.com/api'

  useEffect(() => {
    if (!token) {
      navigate('/signin');
      return;
    }

    fetch(`${API_BASE}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.text();
          localStorage.removeItem('jwt');
          navigate('/signin');
          throw new Error(err || 'Error al cargar tareas');
        }
        return res.json();
      })
      .then(setTasks)
      .catch(err => toast.error(`Error al cargar tareas: ${err.message}`));
  }, [navigate, token]);

  const handleSubmitTask = (taskData) => {
    const isEdit = Boolean(editingTask);
    const url = isEdit
      ? `${API_BASE}/tasks/${editingTask._id}`
      : `${API_BASE}/tasks`;
    const method = isEdit ? 'PATCH' : 'POST';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText || 'Error al guardar tarea');
        }
        return res.json();
      })
      .then((newTask) => {
        setTasks((prev) =>
          isEdit
            ? prev.map((t) => (t._id === newTask._id ? newTask : t))
            : [...prev, newTask]
        );
        toast.success(`Tarea ${isEdit ? 'actualizada' : 'creada'} con éxito`);
        setEditingTask(null);
      })
      .catch(err => toast.error(`Error: ${err.message}`));
  };

  const handleDeleteTask = (taskId) => {
    if (!window.confirm("¿Estás segura de que querés eliminar esta tarea?")) {
      return;
    }

    fetch(`${API_BASE}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.text();
          throw new Error(err || 'Error al eliminar tarea');
        }
        setTasks((prev) => prev.filter((t) => t._id !== taskId));
        toast.success('Tarea eliminada');
      })
      .catch(err => toast.error(`Error al eliminar tarea: ${err.message}`));
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  return (
    <main className="max-w-2xl mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Mis Tareas</h1>
      <TaskForm onSubmit={handleSubmitTask} initialData={editingTask} />
      <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} />
    </main>
  );
}

export default TaskDashboard;
