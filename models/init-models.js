var DataTypes = require("sequelize").DataTypes;
var _collect = require("./collect");
var _login = require("./login");
var _ordinarycol = require("./ordinarycol");
var _proxycol = require("./proxycol");
var _refundcol = require("./refundcol");
var _user = require("./user");
var _positionrequest = require("./positionrequest");
var _positions = require("./positions");
var _board = require("./board");
var _execution = require("./execution");
var _post = require("./post");
var _media = require("./media");

function initModels(sequelize) {
  var collect = _collect(sequelize, DataTypes);
  var login = _login(sequelize, DataTypes);   
  var ordinarycol = _ordinarycol(sequelize, DataTypes);
  var proxycol = _proxycol(sequelize, DataTypes);
  var refundcol = _refundcol(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var positionrequest = _positionrequest(sequelize, DataTypes);
  var positions = _positions(sequelize, DataTypes);
  var board = _board(sequelize, DataTypes);
  var post = _post(sequelize, DataTypes);
  var execution = _execution(sequelize, DataTypes);
  var media = _media(sequelize, DataTypes);

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
  board.sync();
  post.sync();
  execution.sync();
  media.sync();

  return {
    collect,
    login,
    ordinarycol,
    proxycol,
    refundcol,
    user,
    positionrequest,
    positions,
    board,
    post,
    execution,
    media
  };
}


module.exports = initModels;
