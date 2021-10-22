const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wedding_reserve_lines', {
    writ_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    writ_start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    writ_end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    writ_total_day: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    writ_qty: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    writ_price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    writ_subtotal: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    writ_weve_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'wedding_vendor',
        key: 'weve_id'
      }
    },
    writ_wepa_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'wedding_package',
        key: 'wepa_id'
      }
    },
    writ_order_name: {
      type: DataTypes.STRING(15),
      allowNull: true,
      references: {
        model: 'orders',
        key: 'order_name'
      }
    },
    writ_were_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'wedding_reserve',
        key: 'were_id'
      }
    }
  }, {
    sequelize,
    tableName: 'wedding_reserve_lines',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "writ_id_pk",
        unique: true,
        fields: [
          { name: "writ_id" },
        ]
      },
    ]
  });
};
