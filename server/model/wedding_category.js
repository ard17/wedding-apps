const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wedding_category', {
    weca_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    weca_name: {
      type: DataTypes.STRING(35),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'wedding_category',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "weca_id_pk",
        unique: true,
        fields: [
          { name: "weca_id" },
        ]
      },
    ]
  });
};
