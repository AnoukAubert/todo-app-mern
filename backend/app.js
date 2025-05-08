const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// eslint-disable-next-line import/no-extraneous-dependencies
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https://todo-app-mern-vvpk.onrender.com'],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        connectSrc: ["'self'", 'https://todo-app-mern-vvpk.onrender.com'],
        styleSrc: ["'self'", "'unsafe-inline'"],
      },
    },
  }),
);
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://todo-app-mern-vvpk.onrender.com',
    'https://todo-app-mern-mocha.vercel.app',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());
app.use(morgan('dev'));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.use('/api', authRoutes);
app.use('/api/tasks', taskRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch((err) => console.error('❌ Error al conectar a MongoDB:', err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
