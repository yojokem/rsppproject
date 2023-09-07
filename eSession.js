const session = require("express-session");
const EMS = require("express-mysql-session")(session);

const {soDB, sessionSign} = require("./config/config");

let sessionStore = new EMS(soDB);

module.exports = session({
    name: "RSPPSessionProvider",
    secret: sessionSign,
    resave: false,
    saveUninitialized: false,
    touchAfter: 24 * 60 * 60,
    store: sessionStore,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
});