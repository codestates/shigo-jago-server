'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payment.belongsTo(models.Reservation, {
        onDelete: 'CASCADE',
        foreignKey: {
          allowNull: true,
        },
      })
    }
  };
  Payment.init({
    price: DataTypes.INTEGER,
    howPaid: DataTypes.STRING,
    cardNumber: DataTypes.STRING,
    accountNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};