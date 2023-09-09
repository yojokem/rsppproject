const {soDB} = require("./config/config");
const init = require("./models/init-models");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(soDB['database'], soDB['user'], soDB['password'], {
    host: soDB['host'],
    dialect: "mysql",
    pool: {
        max: 20,
        min: 0,
        acquire: 3 * 1000 * 8,
        idle: 10 * 1000
    }
})

const db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    
    tables: init(sequelize)
};


module.exports = db;