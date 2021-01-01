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
      // define association here
      User.hasMany(models.Review, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      }),
      User.hasMany(models.Reservation, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      })
      User.hasMany(models.Social, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      })
    }
  };
  User.init({
    loginId: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    mobile: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  
  return User;
};