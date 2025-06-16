import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import conectarDB from './config/db';
import tareaRoutes from './routes/tareaRoutes'
import errorHandler from './middlewares/errorHandler';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;


// Conexión a la base de datos
conectarDB();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Ruta raíz de verificación
app.get('/', (_req, res) => {
  res.send('API TodoList - Tree S.A.S.');
});

// Rutas de la API
app.use('/api/tareas', tareaRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

