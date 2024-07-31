'use strict';

module.exports = (sequelize, DataTypes) => {
    const capitulo = sequelize.define('capitulo', {
        titulo: { type: DataTypes.STRING(100) },
        estado: { type: DataTypes.ENUM('PUBLICO', 'OCULTO') },
        publicacion_id: { type: DataTypes.INTEGER }
    }, {
        freezeTableName: true
    });

    capitulo.associate = function(models) {
        capitulo.belongsTo(models.publicacion, { foreignKey: 'publicacion_id', as: 'publicacion' });
        capitulo.hasMany(models.parrafo, { foreignKey: 'capitulo_id', as: 'parrafos' });
    };

    return capitulo;
};