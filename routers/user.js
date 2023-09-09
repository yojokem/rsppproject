const express = require("express");
const router = express.Router();
const csrfProtection = require("csurf");
const {csrfRenderer} = require("../config/config");

router.get("/", csrfProtection, (req, res) => {
    console.log('d')

    if(res.locals.validated) {
        res.render("user/index");
    } else csrfRenderer(res, "user/login", req.csrfToken());
});

router.get("/register", csrfProtection, (req, res) => {
    if(res.locals.validated) {
        res.render("user/index");
    } else csrfRenderer(res, "user/register", req.csrfToken());
});

router.get("/logout", (req, res) => {
    console.log('ddd')
    delete res.locals.user;
    res.redirect("../");
});

module.exports = router;