const logger = require("./config/winston")().logger;
const path = require("path");
const { Op } = require("sequelize");

const positions = ['party', 'genaff', 'agent', 'executor', 'chairman', 'auditor', 'abandoned', 'expelled', 'cancelled', 'none'];

module.exports = function (seqMan) {
    
}