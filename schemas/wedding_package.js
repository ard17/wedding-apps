const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wedding_package', {
    wepa_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    wepa_name: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    wepa_price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    wepa_capacity: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    wepa_type: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    wepa_weve_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'wedding_vendor',
        key: 'weve_id'
      }
    }
  }, {
    sequelize,
    tableName: 'wedding_package',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "wepa_id_pk",
        unique: true,
        fields: [
          { name: "wepa_id" },
        ]
      },
    ]
  });
};
