import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import TaskDashboard from "./components/TaskDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token && token.length > 10) { 
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("jwt", token);
    setLoggedIn(true);
    navigate("/tasks");
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    navigate("/signin");
  };

  return (
    <>
      <header className="bg-blue-600 text-white py-4 px-6 flex justify-between">
        <h1 className="text-xl font-semibold">ToDo App</h1>
        {loggedIn && (
          <button onClick={handleLogout} className="hover:underline">
            Cerrar sesión
          </button>
        )}
      </header>

      <Routes>
        <Route path="/signup" element={<Register onLogin={handleLogin} />} />
        <Route path="/signin" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <TaskDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={<Navigate to={loggedIn ? "/tasks" : "/signin"} />}
        />
      </Routes>
    </>
  );
}

export default App;
