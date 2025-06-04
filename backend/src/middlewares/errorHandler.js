"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, _req, res, _next) => {
    console.error('🔴 Error:', err.message || err);
    const status = err.statusCode || 500;
    const mensaje = err.message || 'Error interno del servidor';
    res.status(status).json({ error: mensaje });
};
exports.default = errorHandler;
