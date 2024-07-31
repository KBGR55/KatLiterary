'use strict';
const models = require('../models/');
const Genero = models.genero;
const uuid = require('uuid');

class GeneroFacade {
    async listAllGeneros() {
        try {
            return await Genero.findAll({
                attributes: ['nombre', 'external_id']
            });
        } catch (error) {
            throw new Error(`Error fetching genres: ${error.message}`);
        }
    }

    async createGenero(nombre) {
        if (!nombre) {
            throw new Error('Nombre is required');
        }

        try {
            const data = {
                nombre: nombre,
                external_id: uuid.v4()
            };
            return await Genero.create(data);
        } catch (error) {
            throw new Error(`Error creating genre: ${error.message}`);
        }
    }
}

module.exports = new GeneroFacade();