const logger = require("../config/winston")().logger;
const express = require("express");
const router = express.Router();
const csrfProtection = require("csurf")();
const {mysql_real_escape_string, regFailCauses, csrfRenderer, alertRedirect} = require("../config/config");

module.exports = function (seqMan) {

    router.get("/", csrfProtection, (req, res) => {
        if(res.locals.validated) {
            csrfRenderer(res, "user/index", req.csrfToken());
        } else csrfRenderer(res, "user/login", req.csrfToken());
    });
    
    router.get("/register", csrfProtection, (req, res) => {
        if(res.locals.validated) {
            csrfRenderer(res, "user/index", req.csrfToken());
        } else csrfRenderer(res, "user/register", req.csrfToken());
    });

    router.get("/manage", csrfProtection, (req, res) => {
        if(res.locals.validated) {
            csrfRenderer(res, "user/manage", req.csrfToken());
        } else alertRedirect(res, "로그인이 필요합니다.");
    });
    
    //
    
    /* Post Integration START */
    router.post("/", csrfProtection, (req, res) => {
        req.session.user = req.session.user0;
    
        if(res.locals.validated || req.session.user) {
            if(req.session.user != null && req.session.user.username && req.session.user.password) delete req.session.user0;
        } else {
            alertRedirect(res, "로그인에 실패하였습니다.\n다시 로그인을 시도하거나, 새로 고침을 시도해 주세요.\n\n\t▷▶ 참고 : 연결 | 브라우저 환경(쿠키/세션) 등 ■", "/user");
            return;
        }
    
        res.redirect(req.query.url ? mysql_real_escape_string(req.query.url) : "/user");
    });
    
    router.post("/register", csrfProtection, (req, res) => {
        if(res.locals.validated) {alertRedirect(res, "이미 로그인되어 있는 상태이므로 가입 요청은 무효입니다.", "/user")}
        else {
            if(res.locals.regged) {
                alertRedirect(res, "✨ 회원 가입이 완료되었습니다. 환영합니다.\n🙌관리자의 확인이 있을 때까지\t🤷‍♂️\n기다려 주시기 바랍니다.",
                req.query.url ? mysql_real_escape_string(req.query.url) : "/user");
            } else {
                if(res.locals.replace) alertRedirect(res, res.locals.replace, "/user/register");
                else alertRedirect(res, regFailCauses[6], "/user/register");
            }
        }
    });

    router.post("/password/:id", csrfProtection, async (req, res) => {
        if(res.locals.validated) {
            let password_cur = typeof req.body.password == "string" ? mysql_real_escape_string(req.body.password) : "";

            let p = await seqMan.tables.user.findOne({
                attributes: ['id'],
                where: {
                    id: req.params.id,
                    password: password_cur
                }
            });

            if(p) {
                let password_alt = typeof req.body.password == "string" ? mysql_real_escape_string(req.body.password_alt) : "";
                let password_alt_re = typeof req.body.password == "string" ? mysql_real_escape_string(req.body.password_alt_re) : "";
                
                if(password_cur.length != 64 || password_alt.length != 64 || password_alt_re.length != 64) {
                    alertRedirect(res, "암호화 과정에 오류가 있습니다. 다시 시도하세요.", "/");
                    return;
                }
                if(password_cur == "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" || password_alt == "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" || password_alt_re == "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855") {
                    alertRedirect(res, "빈칸이 있습니다. 다시 시도하세요.", "/");
                    return;
                }
                if(password_alt != password_alt_re) {
                    alertRedirect(res, "신규 비밀번호와 그 재입력 값이 일치하지 않습니다. 다시 시도하세요.", "/");
                    return;
                }

                let rowID;
                if(req.body['_csrf'].length == 36) {
                    rowID = await seqMan.tables.user.update({
                        password: password_alt
                    }, {
                        where: {
                            id: req.params.id,
                            password: password_cur
                        }
                    });

                    alertRedirect(res, "변경되었습니다! (" + rowID + ")", "/");
                }
            } else {
                alertRedirect(res, "사용자 정보가 존재하지 않습니다. 관리자에게 문의 바랍니다.\n▷ 비밀번호가 틀렸을 수도 있습니다.", "/user");
                logger.error("Invalid Access for Password Change: " + req.params.id);
            }
        }
    })
    /* Post Integration END */
    
    //
    
    router.get("/logout", (req, res) => {
        delete req.session.user;
        res.redirect("../");
    });

    return router;
};