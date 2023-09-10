const express = require("express");
const router = express.Router();
const csrfProtection = require("csurf")();
const {csrfRenderer} = require("../config/config");

router.get("/", csrfProtection, (req, res) => {
    if(res.locals.validated) {
        res.render("user/index");
    } else csrfRenderer(res, "user/login", req.csrfToken());
});

router.get("/register", csrfProtection, (req, res) => {
    if(res.locals.validated) {
        res.render("user/index");
    } else csrfRenderer(res, "user/register", req.csrfToken());
});

//

/* Post Integration START */
router.post("/", csrfProtection, (req, res) => {
    req.session.user = req.session.user0;

    if(res.locals.validated) {}

    res.redirect(req.query.url ? req.query.url : "/user");
});

router.post("/register", csrfProtection, (req, res) => {
    if(res.locals.validated) {}
});
/* Post Integration END */

//

router.get("/logout", (req, res) => {
    delete res.locals.user;
    res.redirect("../");
});

module.exports = router;