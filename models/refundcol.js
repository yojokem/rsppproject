const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('refundcol', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    worker: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    incharge: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    proxy: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    inreceipt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    refunded: {
      type: DataTypes.DATE,
      allowNull: false
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    proxycall: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pass: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: "pass_UNIQUE"
    }
  }, {
    sequelize,
    tableName: 'refundcol',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "pass_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "pass" },
        ]
      },
    ]
  });
};
