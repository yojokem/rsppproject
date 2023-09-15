const express = require("express");
const router = express.Router();
const csrfProtection = require("csurf")();
const {mysql_real_escape_string, regFailCauses, csrfRenderer, alertRedirect} = require("../config/config");

const positions = ['party', 'genaff', 'agent', 'executor', 'chairman', 'auditor', 'abandoned', 'expelled', 'cancelled', 'none'];

/**
 * <b>Functions list</b>
 * r -> Position Raw
 * u -> User Object
 */
const positionChecklist = {
    /** Deprecated. Use 'beenThere' instead. */
    isThere: r => positions.includes(r),
    beenThere: u => {
        let v = isThere(u.position);
        if(!v) u.position = "none";
        return v;
    }
}

const { typeCheck, typeList } = require("../config/config");

function OrdinaryContainer() {
    this.worker = "";
    this.incharge = "";
    this.proxy = "";
}

module.exports = function (seqMan) {

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
    router.post("/", csrfProtection, (req, res) => {
        req.session.user = req.session.user0;
    
        if(res.locals.validated) {
            if(res.locals.validated != null && req.session.user != null) delete req.session.user0;
        } else {
            alertRedirect(res, "로그인 상태가 유지되지 않았습니다.\n다시 로그인을 시도하거나, 새로 고침을 시도해 주세요.\n\n\t▷▶ 참고 : 연결 | 브라우저 환경(쿠키/세션) 등의 복합적인 문제일 가능성이 있습니다. ■", "/user");
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

    return router;
};