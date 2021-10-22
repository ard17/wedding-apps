const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    user_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    user_email: {
      type: DataTypes.STRING(55),
      allowNull: false,
      unique: "users_user_email_key"
    },
    user_password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    user_handphone: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    user_roles: {
      type: DataTypes.STRING(15),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "user_id_pk",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "users_user_email_key",
        unique: true,
        fields: [
          { name: "user_email" },
        ]
      },
    ]
  });
};
