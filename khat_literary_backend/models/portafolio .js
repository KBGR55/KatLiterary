'use strict';
module.exports = (sequelize, DataTypes) => {
    const portafolio = sequelize.define('portafolio', {
        cant: { type: DataTypes.INTEGER },
        estado: { type: DataTypes.STRING(50) }
    }, {
        freezeTableName: true
    });

    return portafolio;
};
