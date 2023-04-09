'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ElectricNumber extends Model {

        static associate(models) {
            ElectricNumber.belongsTo(models.Electric, {
                foreignKey: "electricId",
                as: "electric_Data",
            })
        }
    }
    ElectricNumber.init({
        electricId: DataTypes.STRING,
        electricNumber: DataTypes.DOUBLE,
        date: DataTypes.DATE,
        moneyPay: DataTypes.DOUBLE(11, 2),
        isPaid: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'ElectricNumber',
    });
    return ElectricNumber;
};