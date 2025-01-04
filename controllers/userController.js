const logger = require("../config/logger");
const db = require("../models");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const usuario = db.usuario;

const UPLOADS_DIR = path.join(__dirname, "..", "/uploads");

if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_DIR);
    },
    filename: (req, file, cb) => {
        const suffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, `${suffix}-${file.originalname}`);
    },
});


const upload = multer({
    storage, fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Tipo de archivo no permitido"));
        }
    }
});

const handleFileUpload = async (req, res) => {
    try {
        if (!req.files || !req.files.length === 0) {
            return res.status(400).json({ error: "No se ha subido ningún archivo" });
        }

        const uploadedFiles = req.files.map((file) => ({
            filename: file.filename,
            path: file.path,
            size: file.size,
            mimetype: file.mimetype,
        }));

        logger.info(uploadedFiles)

        res.status(200).json({
            message: "Archivos subidos con éxito",
            files: uploadedFiles,
        })

    } catch (error) {
        logger.error(`Error al subir el archivo: ${error.message}`);
        res.status(500).json({ error: "No se pudo subir el archivo" });
    }
}


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
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const {
            rows: usuarios,
            count: total
        } = await usuario.findAndCountAll({
            limit: Number(limit),
            offset: Number(offset),
        });

        res.status(200).json({
            total,
            usuarios,
            page: Number(page),
            limit: Number(limit),
        });

    } catch (error) {
        logger.error(`Error al obtener los usuarios: ${error.message}`);
        res.status(500).json({ error: "No se pudo obtener los usuarios" });
    }
}

module.exports = { handleUserSubmit, handleGetAllUsers, handleFileUpload, upload };