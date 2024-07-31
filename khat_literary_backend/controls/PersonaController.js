'use strict';
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const models = require('../models/');

const salRounds = 8;

class PersonaController {
    async guardar(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ msg: "DATOS FALTANTES", code: 400, errors: errors.array() });
            }

            // Buscar el id del estado usando el external_id proporcionado
            const estado = await models.estado.findOne({
                where: { external_id: req.body.estado_external_id },
                attributes: ['id']
            });

            if (!estado) {
                return res.status(400).json({ msg: "ESTADO NO ENCONTRADO", code: 400 });
            }

            const claveHash = (clave) => bcrypt.hashSync(clave, bcrypt.genSaltSync(salRounds), null);

            const correoAux = req.body.correo;

            // Validar Datos duplicados en la Base de datos
            const correoExistente = await models.cuenta.findOne({ where: { correo: correoAux } });

            if (correoExistente) {
                return res.status(400).json({ msg: "Correo ya existente", code: 400 });
            }

            let transaction = await models.sequelize.transaction();

            try {
                // Crear Persona y Cuenta en la base de datos
                const persona = await models.persona.create({
                    nombres: req.body.nombres,
                    apellidos: req.body.apellidos,
                    alias: req.body.alias,
                    fecha_nacimiento: req.body.fecha_nacimiento,
                    nacionalidad: req.body.nacionalidad,
                    estado_id: estado.id,
                    external_id: req.body.external_id
                }, { transaction });

                await models.cuenta.create({
                    correo: req.body.correo,
                    clave: claveHash(req.body.clave),
                    persona_id: persona.id
                }, { transaction });

                await transaction.commit();
                res.status(200).json({ msg: "Persona y Cuenta creadas exitosamente", code: 200 });

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

module.exports = PersonaController;
