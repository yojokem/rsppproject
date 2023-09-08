var DataTypes = require("sequelize").DataTypes;
var _collect = require("./collect");
var _ordinarycol = require("./ordinarycol");
var _proxycol = require("./proxycol");
var _refundcol = require("./refundcol");
var _user = require("./user");

function initModels(sequelize) {
  var collect = _collect(sequelize, DataTypes);
  var ordinarycol = _ordinarycol(sequelize, DataTypes);
  var proxycol = _proxycol(sequelize, DataTypes);
  var refundcol = _refundcol(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  ordinarycol.belongsTo(collect, { foreignKey: 'passid' });

  user.hasMany(ordinarycol, {
    foreignKey: 'username',
    targetKey: 'worker',
    allowNull: false
  });
  user.hasMany(ordinarycol, {
    foreignKey: 'username',
    targetKey: 'incharge',
    allowNull: false
  });

  user.hasMany(proxycol, {
    foreignKey: 'username',
    targetKey: 'worker',
    allowNull: false
  });
  user.hasMany(proxycol, {
    foreignKey: 'username',
    targetKey: 'incharge',
    allowNull: false
  });
  user.hasMany(proxycol, {
    foreignKey: 'username',
    targetKey: 'proxy',
    allowNull: false
  });

  user.hasMany(refundcol, {
    foreignKey: 'username',
    targetKey: 'worker',
    allowNull: false
  });
  user.hasMany(refundcol, {
    foreignKey: 'username',
    targetKey: 'incharge',
    allowNull: false
  });
  user.hasMany(refundcol, {
    foreignKey: 'username',
    targetKey: 'proxy',
    allowNull: false
  });



  return {
    collect,
    ordinarycol,
    proxycol,
    refundcol,
    sessions,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
