const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ordinarycol', {
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
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    inreceipt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    via: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    class: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pass: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: "pass_UNIQUE"
    }
  }, {
    sequelize,
    tableName: 'ordinarycol',
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
