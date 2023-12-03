var DataTypes = require("sequelize").DataTypes;
var _board = require("./board");
var _collect = require("./collect");
var _execution = require("./execution");
var _login = require("./login");
var _media = require("./media");
var _ordinarycol = require("./ordinarycol");
var _positionrequest = require("./positionrequest");
var _positions = require("./positions");
var _post = require("./post");
var _proxycol = require("./proxycol");
var _refundcol = require("./refundcol");
var _sessions = require("./sessions");
var _user = require("./user");

function initModels(sequelize) {
  var board = _board(sequelize, DataTypes);
  var collect = _collect(sequelize, DataTypes);
  var execution = _execution(sequelize, DataTypes);
  var login = _login(sequelize, DataTypes);
  var media = _media(sequelize, DataTypes);
  var ordinarycol = _ordinarycol(sequelize, DataTypes);
  var positionrequest = _positionrequest(sequelize, DataTypes);
  var positions = _positions(sequelize, DataTypes);
  var post = _post(sequelize, DataTypes);
  var proxycol = _proxycol(sequelize, DataTypes);
  var refundcol = _refundcol(sequelize, DataTypes);
  var sessions = _sessions(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

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

  post.belongsTo(board, {
    foreignKey: 'id',
    targetKey: 'board'
  })

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
    board,
    collect,
    execution,
    login,
    media,
    ordinarycol,
    positionrequest,
    positions,
    post,
    proxycol,
    refundcol,
    sessions,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
