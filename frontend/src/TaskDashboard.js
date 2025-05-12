import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { getTasks, createTask, deleteTask } from './api';

function TaskDashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      } catch (err) {
        setErrorMsg(err.message || 'Error al obtener las tareas');
        toast.error(err.message || 'Error al obtener las tareas');
      }
    };
    fetchTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.warning('El título no puede estar vacío.');
      return;
    }

    try {
      const newTask = await createTask({ title, description });
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setTitle('');
      setDescription('');
      toast.success('Tarea creada correctamente.');
    } catch (err) {
      setErrorMsg(err.message || 'Error al crear la tarea');
      toast.error(err.message || 'Error al crear la tarea');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('¿Estás seguro de eliminar esta tarea?')) {
      try {
        await deleteTask(taskId);
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        toast.success('Tarea eliminada correctamente.');
      } catch (err) {
        setErrorMsg(err.message || 'Error al eliminar la tarea');
        toast.error(err.message || 'Error al eliminar la tarea');
      }
    }
  };

  return (
    <main className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow transition duration-500 ease-in-out transform hover:scale-105">
      <h2 className="text-2xl font-bold mb-4">Panel de Tareas</h2>
      {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
      
      <form onSubmit={handleCreateTask} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título de la tarea"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción de la tarea (opcional)"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
          rows="3"
        />
        <button 
          type="submit" 
          className="w-full bg-violet-900 text-white py-2 rounded hover:bg-violet-950 transition duration-300"
        >
          Crear Tarea
        </button>
      </form>

      <ul className="mt-6 space-y-3">
        <AnimatePresence>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <motion.li 
                key={task._id} 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded transition duration-300 transform hover:scale-105"
              >
                <div>
                  <h3 className="font-semibold">{task.title}</h3>
                  <p className="text-sm text-gray-600">{task.description}</p>
                </div>
                <button 
                  onClick={() => handleDeleteTask(task._id)} 
                  className="bg-red-800 text-white py-1 px-3 rounded hover:bg-red-600 transition"
                >
                  Eliminar
                </button>
              </motion.li>
            ))
          ) : (
            <p className="text-gray-500 text-center mt-4">No hay tareas aún.</p>
          )}
        </AnimatePresence>
      </ul>

      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
    </main>
  );
}

export default TaskDashboard;
