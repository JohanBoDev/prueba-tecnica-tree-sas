"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerTareaPorId = exports.eliminarTarea = exports.actualizarTarea = exports.obtenerTareas = exports.crearTarea = void 0;
const Tarea_1 = __importDefault(require("../models/Tarea"));
const ApiError_1 = require("../utils/ApiError");
const crearTarea = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { titulo, descripcion, fechaLimite, prioridad, categoria } = req.body;
        // Crear nueva instancia de tarea
        const nuevaTarea = new Tarea_1.default({
            titulo,
            descripcion,
            fechaLimite,
            prioridad,
            categoria,
            estado: 'Pendiente',
            activa: true
        });
        const tareaGuardada = yield nuevaTarea.save();
        // Enviar tarea creada como respuesta
        res.status(201).json(tareaGuardada);
    }
    catch (error) {
        // Delegamos el error al middleware centralizado
        next(error);
    }
});
exports.crearTarea = crearTarea;
const obtenerTareas = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { estado, prioridad, categoria, buscar, ordenarPor = 'fechaLimite', orden = 'asc', pagina = '1', limite = '10' } = req.query;
        // Validaciones de valores permitidos
        const estadosValidos = ['Pendiente', 'Completada'];
        const prioridadesValidas = ['Alta', 'Media', 'Baja'];
        const categoriasValidas = ['Trabajo', 'Personal', 'Estudio'];
        const camposOrdenables = ['fechaLimite', 'createdAt', 'updatedAt', 'prioridad'];
        if (estado && !estadosValidos.includes(estado)) {
            throw new ApiError_1.ApiError('Estado inválido', 400);
        }
        if (prioridad && !prioridadesValidas.includes(prioridad)) {
            throw new ApiError_1.ApiError('Prioridad inválida', 400);
        }
        if (categoria && !categoriasValidas.includes(categoria)) {
            throw new ApiError_1.ApiError('Categoría inválida', 400);
        }
        if (!camposOrdenables.includes(ordenarPor)) {
            throw new ApiError_1.ApiError('Campo de ordenamiento inválido', 400);
        }
        if (!['asc', 'desc'].includes(orden)) {
            throw new ApiError_1.ApiError('Orden inválido', 400);
        }
        const filtros = { activa: true };
        if (estado)
            filtros.estado = estado;
        if (prioridad)
            filtros.prioridad = prioridad;
        if (categoria)
            filtros.categoria = categoria;
        if (buscar) {
            filtros.$or = [
                { titulo: { $regex: buscar, $options: 'i' } },
                { descripcion: { $regex: buscar, $options: 'i' } }
            ];
        }
        const paginaActual = parseInt(pagina, 10);
        const limitePorPagina = parseInt(limite, 10);
        const skip = (paginaActual - 1) * limitePorPagina;
        const ordenamiento = {};
        ordenamiento[ordenarPor] = orden === 'desc' ? -1 : 1;
        const [totalResultados, tareas] = yield Promise.all([
            Tarea_1.default.countDocuments(filtros),
            Tarea_1.default.find(filtros).sort(ordenamiento).skip(skip).limit(limitePorPagina)
        ]);
        const totalPaginas = Math.ceil(totalResultados / limitePorPagina);
        res.status(200).json({
            paginaActual,
            totalPaginas,
            totalResultados,
            tareas
        });
    }
    catch (error) {
        next(error);
    }
});
exports.obtenerTareas = obtenerTareas;
const actualizarTarea = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;
        const tarea = yield Tarea_1.default.findOne({ _id: id, activa: true });
        if (!tarea) {
            throw new ApiError_1.ApiError('Tarea no encontrada', 404);
        }
        // Campos protegidos que no deben ser modificados
        const camposNoPermitidos = ['_id', 'activa', 'createdAt', 'updatedAt', '__v'];
        // Eliminar cualquier campo no permitido del body
        camposNoPermitidos.forEach(campo => {
            if (campo in datosActualizados) {
                delete datosActualizados[campo];
            }
        });
        Object.assign(tarea, datosActualizados);
        const tareaGuardada = yield tarea.save();
        res.status(200).json(tareaGuardada);
    }
    catch (error) {
        next(error);
    }
});
exports.actualizarTarea = actualizarTarea;
const eliminarTarea = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tarea = yield Tarea_1.default.findOne({ _id: id, activa: true });
        if (!tarea) {
            throw new ApiError_1.ApiError('Tarea no encontrada', 404);
        }
        tarea.activa = false;
        const tareaEliminada = yield tarea.save();
        res.status(200).json({
            mensaje: 'Tarea eliminada correctamente',
            tarea: tareaEliminada
        });
    }
    catch (error) {
        next(error);
    }
});
exports.eliminarTarea = eliminarTarea;
const obtenerTareaPorId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tarea = yield Tarea_1.default.findOne({ _id: id, activa: true });
        if (!tarea) {
            throw new ApiError_1.ApiError('Tarea no encontrada', 404);
        }
        res.status(200).json(tarea);
    }
    catch (error) {
        next(error);
    }
});
exports.obtenerTareaPorId = obtenerTareaPorId;
