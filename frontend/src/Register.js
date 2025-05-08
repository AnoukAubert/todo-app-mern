import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { register } from "./api";

function Register({ onLogin }) {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await register({ email, password });
      onLogin(data.token);
      navigate("/tasks");
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Registro fallido");
    }
  };

  return (
    <main className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Registrarse</h2>
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="w-full px-3 py-2 border rounded"
          required
        />
        <button 
          type="submit" 
          className="w-full bg-violet-900 text-white py-2 rounded hover:bg-violet-950"
        >
          Registrarse
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        ¿Ya tienes cuenta?{" "}
        <button 
          onClick={() => navigate("/signin")} 
          className="text-violet-900 underline"
        >
          Iniciar sesión
        </button>
      </p>
    </main>
  );
}

export default Register;
