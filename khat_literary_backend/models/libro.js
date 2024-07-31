'use strict';
module.exports = (sequelize, DataTypes) => {
    const libro = sequelize.define('libro', {
        titulo: { type: DataTypes.STRING(100) },
        estado: { type: DataTypes.ENUM('EN_CURSO', 'TERMINADO', 'PAUSADO', 'ABANDONADO') },
        sinopsis: { type: DataTypes.STRING },
        portada: { type: DataTypes.STRING },
        publicacion_id: { type: DataTypes.INTEGER },
        generos: { type: DataTypes.STRING(255) }  // Nueva columna
    }, {
        freezeTableName: true
    });

    libro.associate = function(models) {
        libro.belongsTo(models.publicacion, { foreignKey: 'publicacion_id', as: 'publicacion' });
        libro.hasMany(models.capitulo, { foreignKey: 'libro_id', as: 'capitulos' });
    };

    return libro;
};
