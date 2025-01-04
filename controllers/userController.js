const logger = require("../config/logger");
const db = require("../models");

const usuario = db.usuario;

const handleUserSubmit = async (req, res) => {
    const { nombre, correo, mensaje } = req.body;
    logger.debug(`Nombre: ${nombre}, Correo: ${correo}, Mensaje: ${mensaje}`);

    try {

        const nuevoUsuario = await usuario.create({ nombre, correo, mensaje });
        logger.info(`Usuario creado con ID: ${nuevoUsuario.id}`);
        res.status(201).json(nuevoUsuario);

    } catch (error) {

        if (error.name === "SequelizeValidationError") {
            logger.error(`Errores de validación: ${error.errors.map((e) => e.message).join(", ")}`);
            return res.status(400).json({ error: error.errors.map((e) => e.message) });
        }
        
        logger.error(`Error creando el usuario: ${error.message}`);
        res.status(500).json({ error: "No se pudo crear el usuario" });
    }
}

const handleGetAllUsers = async (req, res) => {
    try {
        const usuarios = await usuario.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        logger.error(`Error al obtener los usuarios: ${error.message}`);
        res.status(500).json({ error: "No se pudo obtener los usuarios" });
    }
}

module.exports = { handleUserSubmit, handleGetAllUsers };