import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./api";

function Login({ onLogin }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ email, password });
      localStorage.setItem("token", data.token);
      onLogin(data.token);
      navigate("/tasks");
    } catch (err) {
      setErrorMsg(err.message || "Inicio de sesión fallido");
    }
  };
  

  return (
    <main className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Iniciar sesión</h2>
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
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
          Entrar
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        ¿No tienes usuario?{" "}
        <button
          onClick={() => navigate("/signup")}
          className="text-violet-900 underline"
        >
          Registrarse
        </button>
      </p>
    </main>
  );
}

export default Login;
