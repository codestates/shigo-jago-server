'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Hotel.hasMany(models.Reservation, {
        foreignKey: 'hotelId',
        onDelete: 'CASCADE',
      }),
      Hotel.hasMany(models.Review, {
        foreignKey: 'hotelId',
        onDelete: 'CASCADE',
      })
    }
  };
  Hotel.init({
    hotelname: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Hotel',
  });
  return Hotel;
};