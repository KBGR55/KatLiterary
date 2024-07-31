'use strict';
const GeneroFacade = require('../facades/GeneroFacade');

class GeneroController {
    async listar(req, res) {
        try {
            const lista = await GeneroFacade.listAllGeneros();
            res.status(200).json({ msg: "OK", code: 200, datos: lista });
        } catch (error) {
            res.status(500).json({ msg: "ERROR", code: 500, error: error.message });
        }
    }

    async guardar(req, res) {
        try {
            if (req.body.hasOwnProperty('nombre')) {
                await GeneroFacade.createGenero(req.body.nombre);
                res.status(200).json({ msg: "OK", code: 200 });
            } else {
                res.status(400).json({ msg: "ERROR", code: 400, tag: "Faltan datos" });
            }
        } catch (error) {
            res.status(500).json({ msg: "ERROR", code: 500, error: error.message });
        }
    }
}

module.exports = GeneroController;