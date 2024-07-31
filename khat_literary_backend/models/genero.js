'use strict';
module.exports = (sequelize, DataTypes) => {
    const genero = sequelize.define('genero', {
        external_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
        nombre: { type: DataTypes.STRING }
    }, {
        freezeTableName: true
    });
    return genero;
};
