const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wedding_reviews', {
    wore_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    wore_comments: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    wore_rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    wore_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    wore_weve_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'wedding_vendor',
        key: 'weve_id'
      }
    }
  }, {
    sequelize,
    tableName: 'wedding_reviews',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "wore_id_pk",
        unique: true,
        fields: [
          { name: "wore_id" },
        ]
      },
    ]
  });
};
