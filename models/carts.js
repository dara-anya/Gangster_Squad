module.exports = function(sequelize, DataTypes) {
  var Carts = sequelize.define("Carts", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    algumacoisa: {
      type: DataTypes.STRING,
      defaultValue: "Personal"
    }
  });
  return Carts;
};
