import { body } from 'express-validator';

export const validarTarea = [
  body('titulo')
    .notEmpty()
    .withMessage('El título es obligatorio'),

  body('descripcion')
    .notEmpty()
    .withMessage('La descripción es obligatoria'),

  body('fechaLimite')
    .notEmpty()
    .withMessage('La fecha límite es obligatoria')
    .isISO8601()
    .withMessage('La fecha límite debe tener un formato válido'),

  body('prioridad')
    .isIn(['Alta', 'Media', 'Baja'])
    .withMessage('La prioridad debe ser Alta, Media o Baja'),

  body('categoria')
    .isIn(['Trabajo', 'Personal', 'Estudio'])
    .withMessage('La categoría debe ser Trabajo, Personal o Estudio')
];

export const validarActualizacionTarea = [
  body('titulo').optional().notEmpty().withMessage('El título no puede estar vacío'),
  body('descripcion').optional().notEmpty().withMessage('La descripción no puede estar vacía'),
  body('fechaLimite').optional().isISO8601().toDate().withMessage('Fecha inválida'),
  body('prioridad').optional().isIn(['Alta', 'Media', 'Baja']).withMessage('Prioridad inválida'),
  body('categoria').optional().isIn(['Trabajo', 'Personal', 'Estudio']).withMessage('Categoría inválida'),
  body('estado').optional().isIn(['Pendiente', 'Completada']).withMessage('Estado inválido')
];