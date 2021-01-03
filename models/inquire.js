'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inquire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Inquire.belongsTo(models.User, {
        onDelete: 'CASCADE',
        foreignKey: {
          allowNull: true
        },
      })
    }
  };
  Inquire.init({
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    subject: DataTypes.STRING,
    message: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Inquire',
  });
  return Inquire;
};