const logger = require("../config/winston")().logger;
const express = require("express");
const router = express.Router();
const csrfProtection = require("csurf")();
const {mysql_real_escape_string, regFailCauses, csrfRenderer, alertRedirect} = require("../config/config");

module.exports = function (seqMan) {

    router.get("/", csrfProtection, (req, res) => {
        csrfRenderer(res, "post/index", req.csrfToken());
    });

    router.get("/board/:name", csrfProtection, (req, res) => {
        csrfRenderer(res, "post/index", req.csrfToken());
    });
    
    router.get("/write", csrfProtection, (req, res) => {
        csrfRenderer(res, "post/write", req.csrfToken());
    });

    return router;
};