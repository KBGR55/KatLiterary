'use strict';
module.exports = (sequelize, DataTypes) => {
    const persona = sequelize.define('persona', {
        external_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
        nombres: { type: DataTypes.STRING(50), defaultValue: 'NO_DATA' },
        apellidos: { type: DataTypes.STRING(50), defaultValue: 'NO_DATA' },
        alias: { type: DataTypes.STRING(50), defaultValue: 'NO_DATA' },
        fecha_nacimiento: { type: DataTypes.DATE },
        nacionalidad: { type: DataTypes.STRING(50), defaultValue: 'NO_DATA' }
    }, {
        freezeTableName: true
    });

    persona.associate = function(models) {
        // Asociación con SolicitudPublicacion
        persona.hasMany(models.solicitudPublicacion, { foreignKey: 'persona_id', as: 'solicitudes' });
        // Asociación con Cuenta
        persona.hasOne(models.cuenta, { foreignKey: 'persona_id', as: 'persona' });
        // Asociación con Publicacion
        persona.hasMany(models.publicacion, { foreignKey: 'persona_id', as: 'publicaciones' });
    };

    return persona;
};
