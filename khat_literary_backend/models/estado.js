'use strict';
module.exports = (sequelize, DataTypes) => {
    const estado = sequelize.define('estado', {
        external_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
        nombre: {type: DataTypes.ENUM('DISPONIBLE', 'OCUPADO', 'EN_VACACIONES', 'DE_BAJA') }
    }, {
        freezeTableName: true
    });

    estado.associate = function(models) {
        estado.hasMany(models.persona, { foreignKey: 'estado_id', as: 'personas' });
    };

    return estado;
};
