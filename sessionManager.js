/**
 * user : {username, password}의 json
 * 
 */

const logger = require("./config/winston")().logger;
const path = require("path");
const { Op } = require("sequelize");
const { regFailCauses } = require("./config/config")

async function validate(user, seqMan) {
    return (await seqMan.tables.user.findOne({
        where: {
            username: user['username'],
            password: user['password'],
            position: {
                [Op.ne]: 'abandoned'
            }
        }
    })) != null;
}

async function checkUsernameAvailable(username, seqMan) {
    return (await seqMan.tables.user.findOne({
        attributes: ['username'],
        where: {
            username: mysql_real_escape_string(username)
        }
    })) != null;
}

function mysql_real_escape_string(str) {
    if (typeof str != "string") return str;

    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case '"':
            case "'":
            case "\\":
            case "%":
                return "\\" + char; // prepends a backslash to backslash, percent,
            // and double/single quotes
        }
    });
}

logger.info("Session Manager ready ✔");

module.exports = function (seqMan) {
    return {
        userSessionCheck: async function (req, res, next) { // 로그인 세션 확인
            if(!req.originalUrl.startsWith("/v")) {
                res.locals.user = req.session.user != null ? req.session.user
                : {username: "", password: ""}; //'user' is one's full credential
            
                res.locals.validated = await validate(res.locals.user, seqMan);
            }

            next();
        },
        userCheck: async function (req, res, next) {
            let p = Object.keys(req.body);

            if(p.includes("_csrf") && req.method.toLowerCase() == "post") {
                if(req.path == "/user") {
                    let logged = false;
                    let username = typeof req.body.username == "string" ? mysql_real_escape_string(req.body.username) : "";
                    let password = typeof req.body.password == "string" ? mysql_real_escape_string(req.body.password) : "";

                    if(username != "" && password != "") {
                        let user;
                        if(req.body['_csrf'].length == 36) {
                            user = (await seqMan.tables.user.findOne({
                                attributes: ['id', 'username', 'name'],
                                where: {
                                    username: username,
                                    password: password,
                                    position: {
                                        [Op.ne]: 'abandoned'
                                    }
                                }
                            }));
        
                            if(user != null) logged = user.id;
                        }
        
                        if(logged == false || logged == null) {
                            req.session.user0 = null;
                        } else {
                            let name = user.name;
                            req.session.user0 = {
                                id: logged,
                                username: username,
                                password: password,
                                name: name
                            }

                            delete req.body.username;
                            delete req.body.password;

                            seqMan.tables.login.create({
                                user: logged,
                                ipaddress: req.ip
                            });
                        }
                    } else req.session.user0 = null;

                    if(logged == false) {
                        logger.info("False Login has occurred. [" + req.ip + "]");
                    } else {
                        logger.info("Logged in. (" + username + ")");
                    }
                } else if(req.path == "/user/register") {
                    let regged = false;
                    let username = typeof req.body.username == "string" ? mysql_real_escape_string(req.body.username) : "";

                    if(username == "") {
                        res.locals.replace = regFailCauses[2];
                        next();
                        return;
                    }
                    if(await checkUsernameAvailable(username, seqMan)) {
                        res.locals.replace = regFailCauses[1];
                        next();
                        return;
                    }

                    let password = typeof req.body.password == "string" ? mysql_real_escape_string(req.body.password) : "";
                    let name =  typeof req.body.name == "string" ? mysql_real_escape_string(req.body.name) : "";
                    let code =  typeof req.body.code == "string" ? mysql_real_escape_string(req.body.code) : "";

                    if(password == "") {
                        res.locals.replace = regFailCauses[3];
                        next();
                        return;
                    }
                    if(code == "") {
                        res.locals.replace = regFailCauses[5]
                        next();
                        return;
                    }
                    if(name == "") {
                        res.locals.replace = regFailCauses[4];
                        next();
                        return;
                    }

                    let rowID;
                    if(req.body['_csrf'].length == 36) {
                        let p = await seqMan.tables.user.create({
                            username: username,
                            password: password,
                            name: name,
                            code: code
                        });

                        rowID = p.id;

                        regged = true;
                    }

                    if(regged == false) {
                        logger.info("False Login has occurred. [" + req.ip + "]");
                    } else {
                        logger.info("Registered: (" + username + ` (${rowID}))`);
                    }

                    res.locals.regged = regged;
                }
            }

            next();
        },
        imports: function (req, res, next) { // res.locals에 넘겨줄 함수, 마지막에 호출된다.
            res.locals.$DIR_VIEW = path.join(__dirname, "./views/");
            res.locals.viewDir = p => path.join(res.locals.$DIR_VIEW, p);

            next();
        }
    };
}