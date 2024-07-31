'use strict';
module.exports = (sequelize, DataTypes) => {
    const parrafo = sequelize.define('parrafo', {
        contenido: { type: DataTypes.STRING }
    }, {
        freezeTableName: true
    });

    parrafo.associate = function(models) {
        parrafo.belongsTo(models.capitulo, { foreignKey: 'capitulo_id', as: 'capitulo' });
    };

    return parrafo;
};