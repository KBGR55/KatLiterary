'use strict';
module.exports = (sequelize, DataTypes) => {
    const portafolioFilter = sequelize.define('portafolioFilter', {
        isIncluded: { type: DataTypes.BOOLEAN }
    }, {
        freezeTableName: true
    });

    portafolioFilter.associate = function(models) {
        portafolioFilter.belongsTo(models.portafolio, { foreignKey: 'portafolio_id', as: 'portafolio' });
    };

    return portafolioFilter;
};
