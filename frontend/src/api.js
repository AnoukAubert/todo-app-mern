const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const handleError = (err) => {
  if (err.response?.data?.message) {
    throw new Error(err.response.data.message);
  }
  throw new Error(err.message || 'Algo salió mal. Intenta nuevamente.');
};

export const getTasks = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Error al obtener las tareas');
    }
    return response.json();
  } catch (err) {
    handleError(err);
  }
};

export const createTask = async (taskData) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) {
      throw new Error('Error al crear la tarea');
    }
    return response.json();
  } catch (err) {
    handleError(err);
  }
};

export const deleteTask = async (taskId) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Error al eliminar la tarea');
    }
  } catch (err) {
    handleError(err);
  }
};

export const login = async ({ email, password }) => {
  try {
    const response = await fetch(`${API_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error('Error al iniciar sesión');
    }
    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data;
  } catch (err) {
    handleError(err);
  }
};

export const register = async ({ email, password }) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error('Error al registrarse');
    }
    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data;
  } catch (err) {
    handleError(err);
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};
