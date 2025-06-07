import { Request, Response, NextFunction } from 'express';
import Tarea from '../models/Tarea';
import { ApiError } from '../utils/ApiError';

export const crearTarea = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { titulo, descripcion, fechaLimite, prioridad, categoria } = req.body;

    // Crear nueva instancia de tarea
    const nuevaTarea = new Tarea({
      titulo,
      descripcion,
      fechaLimite,
      prioridad,
      categoria,
      estado: 'Pendiente',
      activa: true
    });

    const tareaGuardada = await nuevaTarea.save();

    // Enviar tarea creada como respuesta
    res.status(201).json(tareaGuardada);
  } catch (error) {
    // Delegamos el error al middleware centralizado
    next(error);
  }
};

export const obtenerTareas = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      estado,
      prioridad,
      categoria,
      buscar,
      ordenarPor = 'fechaLimite',
      orden = 'asc',
      pagina = '1',
      limite = '10'
    } = req.query;

    // Validaciones de valores permitidos
    const estadosValidos = ['Pendiente', 'Completada'];
    const prioridadesValidas = ['Alta', 'Media', 'Baja'];
    const categoriasValidas = ['Trabajo', 'Personal', 'Estudio'];
    const camposOrdenables = ['fechaLimite', 'createdAt', 'updatedAt', 'prioridad'];

    if (estado && !estadosValidos.includes(estado as string)) {
      throw new ApiError('Estado inválido', 400);
    }

    if (prioridad && !prioridadesValidas.includes(prioridad as string)) {
      throw new ApiError('Prioridad inválida', 400);
    }

    if (categoria && !categoriasValidas.includes(categoria as string)) {
      throw new ApiError('Categoría inválida', 400);
    }

    if (!camposOrdenables.includes(ordenarPor as string)) {
      throw new ApiError('Campo de ordenamiento inválido', 400);
    }

    if (!['asc', 'desc'].includes(orden as string)) {
      throw new ApiError('Orden inválido', 400);
    }

    const filtros: any = { activa: true };

    if (estado) filtros.estado = estado;
    if (prioridad) filtros.prioridad = prioridad;
    if (categoria) filtros.categoria = categoria;

    if (buscar) {
      filtros.$or = [
        { titulo: { $regex: buscar, $options: 'i' } },
        { descripcion: { $regex: buscar, $options: 'i' } }
      ];
    }

    const paginaActual = parseInt(pagina as string, 10);
    const limitePorPagina = parseInt(limite as string, 10);
    const skip = (paginaActual - 1) * limitePorPagina;

    const ordenamiento: any = {};
    ordenamiento[ordenarPor as string] = orden === 'desc' ? -1 : 1;

    const [totalResultados, tareas] = await Promise.all([
      Tarea.countDocuments(filtros),
      Tarea.find(filtros).sort(ordenamiento).skip(skip).limit(limitePorPagina)
    ]);

    const totalPaginas = Math.ceil(totalResultados / limitePorPagina);

    res.status(200).json({
      paginaActual,
      totalPaginas,
      totalResultados,
      tareas
    });
  } catch (error) {
    next(error);
  }
};

export const actualizarTarea = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;

    const tarea = await Tarea.findOne({ _id: id, activa: true });

    if (!tarea) {
      throw new ApiError('Tarea no encontrada', 404);
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
    const tareaGuardada = await tarea.save();

    res.status(200).json(tareaGuardada);
  } catch (error) {
    next(error);
  }
};

export const eliminarTarea = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const tarea = await Tarea.findOne({ _id: id, activa: true });

    if (!tarea) {
      throw new ApiError('Tarea no encontrada', 404);
    }

    tarea.activa = false;
    const tareaEliminada = await tarea.save();

    res.status(200).json({
      mensaje: 'Tarea eliminada correctamente',
      tarea: tareaEliminada
    });
  } catch (error) {
    next(error);
  }
};

