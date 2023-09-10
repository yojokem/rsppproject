/**
 * user : {username, password}의 json
 * 
 */

const logger = require("./config/winston")().logger;
const path = require("path");
const { Op } = require("sequelize");

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
                let logged = false;
                let username = typeof req.body.username == "string" ? mysql_real_escape_string(req.body.username) : "";
                let password = typeof req.body.password == "string" ? mysql_real_escape_string(req.body.password) : "";

                if(username != null && password != null) {
                    if(req.body['_csrf'].length == 36) {
                        let user = (await seqMan.tables.user.findOne({
                            where: {
                                username: username,
                                password: password,
                                position: {
                                    [Op.ne]: 'abandoned'
                                }
                            }
                        })).id;
    
                        if(user != null) logged = user;
                    }
    
                    if(logged == false) {
                        req.session.user0 = null;
                    } else {
                        req.session.user0 = {
                            id: logged,
                            username: username,
                            password: password
                        }

                        delete req.body.username;
                        delete req.body.password;

                        seqMan.tables.login.create({
                            user: logged,
                            ipaddress: req.ip
                        });
                    }
                } else req.session.user0 = null;
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