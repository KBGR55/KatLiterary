'use strict';
module.exports = (sequelize, DataTypes) => {
    const publicacion = sequelize.define('publicacion', {
        external_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
        fecha_publicacion: { type: DataTypes.DATE },
        cant_me_gusta: { type: DataTypes.INTEGER, defaultValue: 0 }
    }, {
        freezeTableName: true
    });

    publicacion.associate = function(models) {
        publicacion.hasMany(models.capitulo, { foreignKey: 'publicacion_id', as: 'capitulos' });
    };

    return publicacion;
};
        