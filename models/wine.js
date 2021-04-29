'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class wine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.wine.belongsTo(models.user)
      models.wine.hasMany(models.comment)
    }
  };
  wine.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    price: DataTypes.STRING,
    purchase_location: DataTypes.STRING,
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'wine',
  });
  return wine;
};