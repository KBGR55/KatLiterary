'use strict';
module.exports = (sequelize, DataTypes) => {
    const nivelEditor = sequelize.define('nivelEditor', {
        categoria: { type: DataTypes.ENUM('BRONCE', 'PLATA', 'ORO', 'PLATINO', 'DIAMANTE', 'MAESTRO') },
        revisiones: { type: DataTypes.INTEGER, defaultValue: 0 }
    }, {
        freezeTableName: true
    });

    nivelEditor.associate = function(models) {
        nivelEditor.hasMany(models.cuenta, { foreignKey: 'nivel_editor_id', as: 'cuentas' });
    };

    return nivelEditor;
};
