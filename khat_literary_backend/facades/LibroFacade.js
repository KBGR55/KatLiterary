'use strict';
const models = require('../models/');
const { Op } = require('sequelize');

class LibroFacade {
    async getGenerosByIds(externalGeneros) {
        return models.genero.findAll({
            where: {
                external_id: {
                    [Op.in]: externalGeneros.split('/')
                }
            },
            attributes: ['id']
        });
    }

    async getPersonaByExternalId(externalPersona) {
        return models.persona.findOne({
            where: { external_id: externalPersona },
            attributes: ['id']
        });
    }

    async createPublicacion(personaId) {
        return models.publicacion.create({
            fecha_publicacion: new Date(),
            cant_me_gusta: 0,
            persona_id: personaId
        });
    }

    async createLibro(libroData, publicacionId, generosIds) {
        return models.libro.create({
            ...libroData,
            publicacion_id: publicacionId,
            generos: generosIds
        });
    }
}

module.exports = new LibroFacade();
