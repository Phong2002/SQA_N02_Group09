'use strict';
const {
    Model
} = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
    class Electric extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Electric.belongsTo(models.User, { foreignKey: 'userId', as: 'userInfo' })
            Electric.hasMany(models.ElectricNumber, { foreignKey: 'electricId', as: 'electricData' })
        }
    }
    Electric.init({
        electricId: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        address: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Electric',
    });
    return Electric;
};