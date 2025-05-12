# ✅ ToDo App MERN

Aplicación full stack MERN para la gestión de tareas con autenticación, validaciones, rate-limiting y animaciones.

ACTUALIZACIÓN 12/05/2025: Se mejoró la funcionalidad de Agregar y Eiminar las tareas, traer las mismas desde la api. Se agregaron animaciónes con Framer Motion y notificaciones con React Toastify.
Si estás leyendo esto pido disculpas por seguir trabajando en el proyecto después de la fecha límite, realmente no soporto dejar proyectos a medio camino. Gracias por la oportunidad.
---

## 🌐 Enlaces

- **Frontend:** [Vercel Deployment](https://todo-app-mern-mocha.vercel.app)
- **Backend:** [Render Deployment](https://todo-app-mern-vvpk.onrender.com)
- **GitHub:** [Repositorio](https://github.com/AnoukAubert/todo-app-mern)

---

## 🧩 Tecnologías utilizadas

### 🚀 Frontend:
- **React** - UI y Componentes
- **React Router** - Navegación
- **TailwindCSS** - Diseño y estilos
- **React Toastify** - Notificaciones
- **Framer Motion** - Animaciones

### 🚀 Backend:
- **Node.js + Express** - API REST
- **MongoDB + Mongoose** - Base de datos
- **JWT + Bcrypt** - Autenticación segura
- **Morgan** - Logging de peticiones
- **Express Rate Limit** - Protección contra spam

---

## 🚀 Funcionalidades

- 🔐 **Autenticación:** Registro e inicio de sesión con JWT.
- ✅ **Gestión de Tareas:** Crear, editar y eliminar tareas.
- 🚀 **Animaciones:** Efectos visuales con Framer Motion.
- 🌐 **Protección de Rutas:** Solo usuarios autenticados pueden ver sus tareas.
- 🚫 **Rate Limiting:** Protección contra ataques de fuerza bruta.
- 🔍 **Logging:** Registra todas las peticiones del servidor.
- 🌩️ **Desplegado en Vercel (Frontend) y Render (Backend)**.

---

## ⚙️ Variables de entorno necesarias (.env)

**Este archivo NO se incluye en el repositorio por seguridad.**  
Debes crear uno en la carpeta `backend` con el siguiente contenido:

PORT=5000
MONGODB_URI=mongodb+srv://<tus-datos-de-mongo>
JWT_SECRET=unaclavesegura


---

## ✨ Bonus aplicados

- ✅ Autenticación persistente con localStorage.
- ✅ Confirmación visual antes de eliminar.
- ✅ Animaciones sutiles (Framer Motion).
- ✅ Logging de errores (Morgan).
- ✅ Rate-limiting básico.
- ❌ Api Client y Secret: No implementado ya que se orienta a APIs públicas.

---

## 🧪 Instrucciones de desarrollo

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/AnoukAubert/todo-app-mern.git
2️⃣ Configurar el Backend

cd backend
npm install

    Crear el archivo .env y completar los datos necesarios.

3️⃣ Configurar el Frontend

cd ../frontend
npm install

4️⃣ Ejecutar la aplicación en desarrollo

# Backend
cd backend
npm start

# Frontend
cd ../frontend
npm start

🚀 Despliegue
🌐 Desplegando el Backend en Render

    Crear un nuevo servicio en Render.

    Conectar el repositorio y seleccionar la carpeta backend.

    Configurar el comando de inicio:

    npm start

    Configurar las variables de entorno (MONGODB_URI, JWT_SECRET).

🌐 Desplegando el Frontend en Vercel

    Crear un nuevo proyecto en Vercel.

    Conectar el repositorio y seleccionar la carpeta frontend.

    Asegurarse de que el frontend apunte a la URL del backend en Render.

❓ ¿Dudas o problemas?

Si encontrás algún problema o querés mejorar algo, ¡abrí un issue en el repositorio o contactame!
