import { Router } from 'express';
import { crearTarea, obtenerTareas, actualizarTarea, eliminarTarea, obtenerTareaPorId } from '../controllers/tareaController';
import { validarTarea, validarActualizacionTarea } from '../validators/tareaValidator';
import { validarCampos } from '../middlewares/validarCampos';
import { validarIdMongo } from '../validators/idValidator';

const router = Router();

router.post('/crear', [...validarTarea, validarCampos], crearTarea);
router.get('/obtener', obtenerTareas);
router.put('/actualizar/:id', [...validarActualizacionTarea, validarCampos], actualizarTarea);
router.delete('/eliminar/:id', eliminarTarea);
router.get('/obtenerPorId/:id', validarIdMongo, validarCampos, obtenerTareaPorId);


export default router;