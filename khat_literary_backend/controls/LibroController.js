'use strict';
const { body, validationResult } = require('express-validator');
const models = require('../models/');
const { Op } = require('sequelize');

class LibroController {
    async guardar(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ msg: "DATOS FALTANTES", code: 400, errors: errors.array() });
            }

            if (!req.file) {
                return res.status(400).json({ msg: "Falta cargar la imagen de portada", code: 400 });
            }

            const { external_generos, external_persona, ...libroData } = req.body;

            // Buscar los ids de los géneros usando los external_ids proporcionados
            const generos = await models.genero.findAll({
                where: {
                    external_id: {
                        [Op.in]: external_generos.split('/')
                    }
                },
                attributes: ['id']
            });

            if (generos.length === 0) {
                return res.status(400).json({ msg: "GÉNEROS NO ENCONTRADOS", code: 400 });
            }

            const generosIds = generos.map(genero => genero.id).join('/');

            // Buscar el id de la persona usando el external_id proporcionado
            const persona = await models.persona.findOne({
                where: { external_id: external_persona },
                attributes: ['id']
            });

            if (!persona) {
                return res.status(400).json({ msg: "PERSONA NO ENCONTRADA", code: 400 });
            }

            let transaction = await models.sequelize.transaction();

            try {
                // Crear Publicación
                const publicacion = await models.publicacion.create({
                    fecha_publicacion: new Date(),
                    cant_me_gusta: 0,
                    persona_id: persona.id
                }, { transaction });

                // Crear Libro
                await models.libro.create({
                    ...libroData,
                    portada: req.file.filename,
                    publicacion_id: publicacion.id,
                    generos: generosIds
                }, { transaction });

                await transaction.commit();
                res.status(200).json({ msg: "Libro y Publicación creados exitosamente", code: 200 });

            } catch (error) {
                if (transaction) await transaction.rollback();
                const errorMsg = error.errors && error.errors[0] && error.errors[0].message
                    ? error.errors[0].message
                    : error.message;
                res.status(500).json({ msg: errorMsg, code: 500 });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Error interno del servidor", code: 500 });
        }
    }
}

module.exports = LibroController;