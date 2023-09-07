const express = require("express");
const router = express.Router();
const csrfProtection = require("csurf");
const {csrfRenderer} = require("../config/config");

router.get("/authenticate", csrfProtection, (req, res) => {
    csrfRenderer(res, "authenticate", req.csrfToken());
});

module.exports = router;    