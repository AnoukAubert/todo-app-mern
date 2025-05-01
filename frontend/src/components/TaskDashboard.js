import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

function TaskDashboard() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('jwt');

  useEffect(() => {
    if (!token) {
      navigate('/signin');
      return;
    }

    fetch('/api/tasks', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(async (res) => {
        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            localStorage.removeItem('jwt');
            navigate('/signin');
          }
          const err = await res.json();
          throw new Error(err.message);
        }
        return res.json();
      })
      .then(data => setTasks(data))
      .catch(err => {
        console.error('Error al cargar tareas:', err.message);
      });
  }, [navigate, token]);

  const handleSubmitTask = (taskData) => {
    const url = editingTask ? `/api/tasks/${editingTask._id}` : '/api/tasks';
    const method = editingTask ? 'PATCH' : 'POST';

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
          if (res.status === 401 || res.status === 403) {
            localStorage.removeItem('jwt');
            navigate('/signin');
          }
          const err = await res.json();
          throw new Error(err.message);
        }
        return res.json();
      })
      .then((newTask) => {
        if (editingTask) {
          setTasks(prev =>
            prev.map(t => (t._id === newTask._id ? newTask : t))
          );
        } else {
          setTasks(prev => [...prev, newTask]);
        }
        setEditingTask(null);
      })
      .catch(err => console.error('Error al guardar tarea:', err));
  };

  const handleDeleteTask = (taskId) => {
    fetch(`/api/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al eliminar tarea');
        setTasks(prev => prev.filter(t => t._id !== taskId));
      })
      .catch(err => console.error('Error al eliminar tarea:', err));
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
