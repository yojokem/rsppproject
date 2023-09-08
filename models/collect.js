const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('collect', {
    idcollect: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    passid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "passid_UNIQUE"
    },
    registered: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'collect',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idcollect" },
        ]
      },
      {
        name: "passid_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "passid" },
        ]
      },
    ]
  });
};
