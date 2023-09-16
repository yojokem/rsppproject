const express = require("express");
const router = express.Router();
const csrfProtection = require("csurf")();
const {mysql_real_escape_string, csrfRenderer, alertRedirect} = require("../config/config");

const { typeCheck, typeList } = require("../config/config");

function OrdinaryContainer() {
    this.worker = "";
    this.incharge = "";
    this.proxy = "";
}

module.exports = function (seqMan) {

    router.get("/", csrfProtection, (req, res) => {
        if(res.locals.user) {
            res.render("user/index");
        } else csrfRenderer(res, "user/login", req.csrfToken());
    });
    
    router.get("/register", csrfProtection, (req, res) => {
        if(res.locals.user) {
            res.render("user/index");
        } else csrfRenderer(res, "user/register", req.csrfToken());
    });
    router.post("/", csrfProtection, (req, res) => {
        
    });
    
    router.post("/register", csrfProtection, (req, res) => {
        
    });

    return router;
};