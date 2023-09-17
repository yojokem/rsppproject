var DataTypes = require("sequelize").DataTypes;
var _collect = require("./collect");
var _login = require("./login");
var _ordinarycol = require("./ordinarycol");
var _proxycol = require("./proxycol");
var _refundcol = require("./refundcol");
var _user = require("./user");
var _positionrequest = require("./positionrequest");
var _positions = require("./positions");

function initModels(sequelize) {
  var collect = _collect(sequelize, DataTypes);
  var login = _login(sequelize, DataTypes);   
  var ordinarycol = _ordinarycol(sequelize, DataTypes);
  var proxycol = _proxycol(sequelize, DataTypes);
  var refundcol = _refundcol(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var positionrequest = _positionrequest(sequelize, DataTypes);
  var positions = _positions(sequelize, DataTypes);

  ordinarycol.belongsTo(collect, { foreignKey: 'id', targetKey: 'passid' });
  proxycol.belongsTo(collect, { foreignKey: 'id', targetKey: 'passid' });
  refundcol.belongsTo(collect, { foreignKey: 'id', targetKey: 'passid' });

  collect.hasMany(ordinarycol, { foreignKey: 'pass', targetKey: 'passid' });
  collect.hasMany(proxycol, { foreignKey: 'pass', targetKey: 'passid' });
  collect.hasMany(refundcol, { foreignKey: 'pass', targetKey: 'passid' });

  user.hasMany(login, { foreignKey: 'user', targetKey: 'id'});

  user.hasMany(positionrequest, { foreignKey: 'userID', targetKey: 'id'});

  positions.hasMany(user, { foreignKey: 'position', targetKey: 'called'});

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
  positionrequest.sync();
  positions.sync();

  return {
    collect,
    login,
    ordinarycol,
    proxycol,
    refundcol,
    user,
    positionrequest,
    positions
  };
}


module.exports = initModels;
