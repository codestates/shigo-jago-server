'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User, {
        onDelete: 'CASCADE',
        foreignKey: {
          allowNull: true,
        }
      }),
      Review.belongsTo(models.Hotel, {
        onDelete: 'CASCADE',
        foreignKey: {
          allowNull: true,
        }
      })
    }
  };
  Review.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};