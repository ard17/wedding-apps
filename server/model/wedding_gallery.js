const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wedding_gallery', {
    wega_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    wega_url_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    wega_filesize: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    wega_filetype: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    wega_weve_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'wedding_vendor',
        key: 'weve_id'
      }
    }
  }, {
    sequelize,
    tableName: 'wedding_gallery',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "wega_id_pk",
        unique: true,
        fields: [
          { name: "wega_id" },
        ]
      },
    ]
  });
};
