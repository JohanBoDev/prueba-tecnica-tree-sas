import { Router } from 'express';
import { crearTarea, obtenerTareas, actualizarTarea, eliminarTarea } from '../controllers/tareaController';
import { validarTarea, validarActualizacionTarea } from '../validators/tareaValidator';
import { validarCampos } from '../middlewares/validarCampos';

const router = Router();

router.post('/crear', [...validarTarea, validarCampos], crearTarea);
router.get('/obtener', obtenerTareas);
router.put('/actualizar/:id', [...validarActualizacionTarea, validarCampos], actualizarTarea);
router.delete('/eliminar/:id', eliminarTarea);


export default router;