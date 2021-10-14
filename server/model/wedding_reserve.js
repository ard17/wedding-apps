const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wedding_reserve', {
    were_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    were_created: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    were_status: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    were_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'wedding_reserve',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "were_id_pk",
        unique: true,
        fields: [
          { name: "were_id" },
        ]
      },
    ]
  });
};
