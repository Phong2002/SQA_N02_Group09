'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Electric, { foreignKey: 'userId', as: 'electricInfo' })
      User.belongsTo(models.Role, { foreignKey: 'role_code', targetKey: 'code', as: 'roleValue' })
      // User.hasMany(models.Electric, {foreignKey: 'userId', as: 'userInfo'})
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    birthDay: DataTypes.DATEONLY,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    cccd: DataTypes.STRING,
    avatar: DataTypes.STRING,
    role_code: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    gender: DataTypes.STRING,
    // reset_password_token: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};