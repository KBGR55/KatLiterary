'use strict';
module.exports = (sequelize, DataTypes) => {
    const cuenta = sequelize.define('cuenta', {
        correo: { type: DataTypes.STRING(100), allowNull: false },
        clave: { type: DataTypes.STRING(100), allowNull: false }
    }, {
        freezeTableName: true
    });

    cuenta.associate = function(models) {
        cuenta.belongsTo(models.persona, { foreignKey: 'persona_id', as: 'persona' });
        cuenta.belongsTo(models.nivelEditor, { foreignKey: 'nivel_editor_id', as: 'nivel_editor' });
    };

    return cuenta;
};
