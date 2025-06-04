"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCampos = void 0;
const express_validator_1 = require("express-validator");
const validarCampos = (req, res, next) => {
    const errores = (0, express_validator_1.validationResult)(req);
    if (!errores.isEmpty()) {
        res.status(400).json({
            errores: errores.array().map((error) => {
                let campoIdentificador;
                // Si es un error de un campo conocido
                if (error.type === 'field') {
                    campoIdentificador = error.path;
                    // Si es un campo no esperado en el body
                }
                else if (error.type === 'unknown_fields') {
                    campoIdentificador = error.fields.map(f => f.path).join(', ');
                    // Para otros tipos de validación (alternativas, estructuras agrupadas, etc.)
                }
                else {
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
exports.validarCampos = validarCampos;
