import { param } from 'express-validator';

export const validarIdMongo = [
  param('id').isMongoId().withMessage('ID no válido')
];