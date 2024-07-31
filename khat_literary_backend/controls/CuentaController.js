const { body, validationResult } = require('express-validator');
const models = require('../models/');
const persona = models.persona;
const cuenta = models.cuenta;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class CuentaController {
    async sesion(req, res) {
        // Verificar si hay errores de validación
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // Buscar la cuenta con el correo proporcionado
            const login = await cuenta.findOne({
                where: { correo: req.body.correo },
                include: {
                    model: persona,
                    as: 'persona',
                    attributes: ['apellidos', 'nombres', 'external_id', 'estado_id']
                }
            });

            // Verificar si el usuario existe
            if (login === null) {
                return res.status(400).json({
                    msg: "Usuario no registrado en el sistema",
                    code: 400
                });
            }

            // Obtener el estado del usuario
            const estado = await models.estado.findByPk(login.persona.estado_id);

            // Verificar si el usuario está dado de baja
            if (estado && estado.nombre === 'DE_BAJA') {
                return res.status(403).json({
                    msg: "No puede ingresar, usuario dado de baja",
                    code: 403
                });
            }

            // Verificar la validez de la contraseña
            const isClaveValida = (clave, claveUser) => bcrypt.compareSync(claveUser, clave);

            if (isClaveValida(login.clave, req.body.clave)) {
                const tokenData = {
                    external: login.persona.external_id,
                    correo: login.correo,
                    nombres: login.persona.nombres,
                    apellidos: login.persona.apellidos,
                    check: true
                };

                // Configurar la clave secreta para JWT
                require('dotenv').config();
                const llave = process.env.KEY_SQ;
                const token = jwt.sign(tokenData, llave, {
                    expiresIn: '24h' // Token válido por 24 horas
                });

                return res.status(200).json({
                    token: token,
                    user: `${login.persona.nombres} ${login.persona.apellidos}`,
                    msg: `Bienvenid@ ${login.persona.nombres} ${login.persona.apellidos}`,
                    correo: login.correo,
                    info: login,
                    code: 200
                });
            } else {
                return res.status(401).json({
                    msg: "Clave incorrecta",
                    code: 401
                });
            }
        } catch (error) {
            console.error("Error en el servidor:", error); // Añadir un log de error para depuración
            return res.status(500).json({
                msg: "Error en el servidor",
                code: 500,
                error: error.message
            });
        }
    }
}

module.exports = CuentaController;