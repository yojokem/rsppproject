var DataTypes = require("sequelize").DataTypes;
var _collect = require("./collect");
var _login = require("./login");
var _ordinarycol = require("./ordinarycol");
var _proxycol = require("./proxycol");
var _refundcol = require("./refundcol");
var _user = require("./user");

function initModels(sequelize) {
  var collect = _collect(sequelize, DataTypes);
  var login = _login(sequelize, DataTypes);
  var ordinarycol = _ordinarycol(sequelize, DataTypes);
  var proxycol = _proxycol(sequelize, DataTypes);
  var refundcol = _refundcol(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  ordinarycol.belongsTo(collect, { foreignKey: 'id', targetKey: 'passid' });
  proxycol.belongsTo(collect, { foreignKey: 'id', targetKey: 'passid' });
  refundcol.belongsTo(collect, { foreignKey: 'id', targetKey: 'passid' });

  user.hasMany(login, {
    foreignKey: 'id',
    targetKey: 'user',
    allowNull: false
  })

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

  ordinarycol.afterCreate(async (coll, options) => {
    collect.create({
      passid: coll.id
    });
  });

  proxycol.afterCreate(async (coll, options) => {
    collect.create({
      passid: coll.id
    });
  });

  refundcol.afterCreate(async (coll, options) => {
    collect.create({
      passid: coll.id
    });
  });

  collect.sync();
  login.sync();
  ordinarycol.sync();
  proxycol.sync();
  refundcol.sync();
  user.sync();

  return {
    collect,
    login,
    ordinarycol,
    proxycol,
    refundcol,
    user,
  };
}


module.exports = initModels;
