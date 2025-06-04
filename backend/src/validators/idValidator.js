"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarIdMongo = void 0;
const express_validator_1 = require("express-validator");
exports.validarIdMongo = [
    (0, express_validator_1.param)('id').isMongoId().withMessage('ID no válido')
];
