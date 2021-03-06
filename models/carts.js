module.exports = function(sequelize, DataTypes) {
  var Carts = sequelize.define("Carts", {


    sku: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
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
      defaultValue: 1,
      validate: { min: 1, max: 999 }
    },

  });
  return Carts;
};
