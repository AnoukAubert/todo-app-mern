# ToDo App MERN

Aplicación full stack MERN para la gestión de tareas con autenticación, validaciones, rate-limiting y animaciones.

## Enlaces

- **Frontend:** https://todo-app-mern-mocha.vercel.app
- **Backend:** https://todo-app-mern-vvpk.onrender.com
- **GitHub:** https://github.com/AnoukAubert/todo-app-mern

## 🧩 Tecnologías utilizadas

- **Frontend:** React, React Router, TailwindCSS, React Toastify, Framer Motion
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
- **Extras:** Morgan (logs), Express Rate Limit, Vercel (deploy)

## 🚀 Funcionalidades

- Registro e inicio de sesión
- Creación, edición y eliminación de tareas
- Protección de rutas mediante autenticación
- Persistencia de sesión con JWT en `localStorage`
- Animaciones sutiles con Framer Motion
- Confirmaciones visuales con `toast` y `window.confirm`
- Logging de peticiones con `morgan`
- Rate limiting para evitar spam de peticiones

## ⚙️ Variables de entorno necesarias (`.env`)

> **Este archivo no se incluye por seguridad. Debe ser creado localmente con el siguiente contenido:**

PORT=5000
MONGODB_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=unaclavesegura

---------------------------------------------------------------------------------------------------------------

Markdown

## ✨ Bonus aplicados

- ✅ Autenticación persistente con `localStorage`
- ✅ Confirmación visual antes de eliminar
- ✅ Animaciones sutiles
- ✅ Logging de errores
- ✅ Rate-limiting básico
- ❌ Api Client y Secret: no implementado ya que se orienta a APIs públicas

## 🧪 Instrucciones de desarrollo

1. Clonar el repositorio
2. Crear `.env` en la carpeta `backend`
3. Instalar dependencias:

```bash
cd backend
npm install

cd ../frontend
npm install

---------------------------------------------------------------------------------------------------------------

Para ejecutar en servidores:

# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm start