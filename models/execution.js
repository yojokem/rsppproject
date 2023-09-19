const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('execution', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    worker: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    item: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    itemColumn: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    purposed: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    used_place: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    used: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'execution',
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
    ]
  });
};
