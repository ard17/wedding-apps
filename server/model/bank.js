const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bank', {
    bank_id: {
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey: true
    },
    bank_name: {
      type: DataTypes.STRING(25),
      allowNull: true,
      unique: "bank_bank_name_key"
    }
  }, {
    sequelize,
    tableName: 'bank',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "bank_bank_name_key",
        unique: true,
        fields: [
          { name: "bank_name" },
        ]
      },
      {
        name: "bank_id_pk",
        unique: true,
        fields: [
          { name: "bank_id" },
        ]
      },
    ]
  });
};
