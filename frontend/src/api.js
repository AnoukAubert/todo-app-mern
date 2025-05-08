const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const handleError = (err) => {
  if (err.response?.data?.message) {
    throw new Error(err.response.data.message);
  }
  throw new Error("Algo salió mal. Intenta nuevamente.");
};

export const getTasks = async (token) => {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Error al obtener las tareas");
    }
    return response.json();
  } catch (err) {
    handleError(err);
  }
};

export const createTask = async (token, task) => {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error("Error al crear la tarea");
    }
    return response.json();
  } catch (err) {
    handleError(err);
  }
};

export const updateTask = async (token, taskId, updates) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error("Error al actualizar la tarea");
    }
    return response.json();
  } catch (err) {
    handleError(err);
  }
};

export const deleteTask = async (token, taskId) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Error al eliminar la tarea");
    }
  } catch (err) {
    handleError(err);
  }
};

export const login = async ({ email, password }) => {
  try {
    const response = await fetch(`${API_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Error al iniciar sesión");
    }
    return response.json();
  } catch (err) {
    handleError(err);
  }
};

export const register = async ({ email, password }) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Error al registrarse");
    }
    return response.json();
  } catch (err) {
    handleError(err);
  }
};
