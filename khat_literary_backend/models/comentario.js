'use strict';

module.exports = (sequelize, DataTypes) => {
    const comentario = sequelize.define('comentario', {
        external_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
        fecha_publicacion: { type: DataTypes.DATE },
        estado: { type: DataTypes.BOOLEAN },
        contenido: { type: DataTypes.TEXT }
    }, {
        freezeTableName: true
    });
1
    comentario.associate = function(models) {
        comentario.belongsTo(models.persona, { foreignKey: 'persona_id', as: 'persona' });
        comentario.belongsTo(models.publicacion, { foreignKey: 'publicacion_id', as: 'publicacion' });
    };

    return comentario;
};
