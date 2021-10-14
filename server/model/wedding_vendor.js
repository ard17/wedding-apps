const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wedding_vendor', {
    weve_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    weve_name: {
      type: DataTypes.STRING(150),
      allowNull: true,
      unique: "wedding_vendor_weve_name_key"
    },
    weve_rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    weve_type: {
      type: DataTypes.STRING(35),
      allowNull: true
    },
    weve_province: {
      type: DataTypes.STRING(55),
      allowNull: true
    },
    weve_city: {
      type: DataTypes.STRING(55),
      allowNull: true
    },
    weve_address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    weve_start_price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    weve_weca_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'wedding_category',
        key: 'weca_id'
      }
    }
  }, {
    sequelize,
    tableName: 'wedding_vendor',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "wedding_vendor_weve_name_key",
        unique: true,
        fields: [
          { name: "weve_name" },
        ]
      },
      {
        name: "weve_id_pk",
        unique: true,
        fields: [
          { name: "weve_id" },
        ]
      },
    ]
  });
};
