/**
 * user : {username, password}의 json
 * 
 */

const logger = require("./config/winston")().logger;
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
        imports: function (req, res, next) { // res.locals에 넘겨줄 함수, 마지막에 호출된다.
            
            next();
        }
    };
}