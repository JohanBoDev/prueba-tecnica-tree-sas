"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarActualizacionTarea = exports.validarTarea = void 0;
const express_validator_1 = require("express-validator");
exports.validarTarea = [
    (0, express_validator_1.body)('titulo')
        .notEmpty()
        .withMessage('El título es obligatorio'),
    (0, express_validator_1.body)('descripcion')
        .notEmpty()
        .withMessage('La descripción es obligatoria'),
    (0, express_validator_1.body)('fechaLimite')
        .notEmpty()
        .withMessage('La fecha límite es obligatoria')
        .isISO8601()
        .withMessage('La fecha límite debe tener un formato válido'),
    (0, express_validator_1.body)('prioridad')
        .isIn(['Alta', 'Media', 'Baja'])
        .withMessage('La prioridad debe ser Alta, Media o Baja'),
    (0, express_validator_1.body)('categoria')
        .isIn(['Trabajo', 'Personal', 'Estudio'])
        .withMessage('La categoría debe ser Trabajo, Personal o Estudio')
];
exports.validarActualizacionTarea = [
    (0, express_validator_1.body)('titulo').optional().notEmpty().withMessage('El título no puede estar vacío'),
    (0, express_validator_1.body)('descripcion').optional().notEmpty().withMessage('La descripción no puede estar vacía'),
    (0, express_validator_1.body)('fechaLimite').optional().isISO8601().toDate().withMessage('Fecha inválida'),
    (0, express_validator_1.body)('prioridad').optional().isIn(['Alta', 'Media', 'Baja']).withMessage('Prioridad inválida'),
    (0, express_validator_1.body)('categoria').optional().isIn(['Trabajo', 'Personal', 'Estudio']).withMessage('Categoría inválida'),
    (0, express_validator_1.body)('estado').optional().isIn(['Pendiente', 'Completada']).withMessage('Estado inválido')
];
