module.exports = function(sequelize, DataTypes) {
  var Carts = sequelize.define("Carts", {


    sku: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },

    product: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },

    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      validate: {
        len: [1]
      }
    },

    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },

  });
  return Carts;
};
