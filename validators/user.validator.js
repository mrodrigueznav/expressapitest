const { check, validationResult } = require('express-validator');
const logger = require('../config/logger');

exports.validateUser = [
    check('nombre')
        .trim()
        .notEmpty().withMessage('El nombre es requerido')
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    check('correo')
        .trim()
        .notEmpty().withMessage('El correo es requerido')
        .isEmail().withMessage('El correo no es válido'),
    check('mensaje')
        .trim(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.warn(`Validation errors: ${JSON.stringify(errors.array())}`);
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];