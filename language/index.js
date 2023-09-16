const logger = require("../config/winston")().logger;

const DEFAULT_LANG = "ko";
let current_LANG = process.env.LANG || process.env.LANGUAGE || DEFAULT_LANG;

module.exports = require("./select")(current_LANG);