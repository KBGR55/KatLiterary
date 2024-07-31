'use strict';
module.exports = (sequelize, DataTypes) => {
    const solicitudPublicacion = sequelize.define('solicitudPublicacion', {
        estado: { type: DataTypes.STRING(50) },
        fecha_inicio: { type: DataTypes.DATE },
        fecha_fn: { type: DataTypes.DATE },
        comentario: { type: DataTypes.TEXT },
        escritor_id: { type: DataTypes.INTEGER }, // Foreign key for the writer
        editor_id: { type: DataTypes.INTEGER }, // Foreign key for the editor
        publicacion_id: { type: DataTypes.INTEGER } // Foreign key for the publication
    }, {
        freezeTableName: true
    });

    solicitudPublicacion.associate = function(models) {
        solicitudPublicacion.belongsTo(models.persona, { foreignKey: 'escritor_id', as: 'escritor' });
        solicitudPublicacion.belongsTo(models.persona, { foreignKey: 'editor_id', as: 'editor' });
        solicitudPublicacion.belongsTo(models.publicacion, { foreignKey: 'publicacion_id', as: 'publicacion' });
    };

    return solicitudPublicacion;
};
