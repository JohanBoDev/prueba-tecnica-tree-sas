"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const tareaRoutes_1 = __importDefault(require("./routes/tareaRoutes"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Conexión a la base de datos
(0, db_1.default)();
// Middlewares globales
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Ruta raíz de verificación
app.get('/', (_req, res) => {
    res.send('API TodoList - Tree S.A.S.');
});
// Rutas de la API
app.use('/api/tareas', tareaRoutes_1.default);
// Middleware de manejo de errores
app.use(errorHandler_1.default);
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
