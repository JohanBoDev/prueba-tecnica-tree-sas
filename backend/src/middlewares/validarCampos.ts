import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationError } from 'express-validator';

export const validarCampos = (req: Request, res: Response, next: NextFunction): void => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    res.status(400).json({
      errores: errores.array().map((error: ValidationError) => {
        let campoIdentificador: string;

        // Si es un error de un campo conocido
        if (error.type === 'field') {
          campoIdentificador = error.path;

        // Si es un campo no esperado en el body
        } else if (error.type === 'unknown_fields') {
          campoIdentificador = error.fields.map(f => f.path).join(', ');

        // Para otros tipos de validación (alternativas, estructuras agrupadas, etc.)
        } else {
          campoIdentificador = error.type;
        }

        return {
          campo: campoIdentificador,
          mensaje: error.msg
        };
      })
    });

    return; // Evitar que continue si ya se respondió
  }

  next(); // Si no hay errores, pasa al siguiente middleware/controlador
};
