const logger = require("../config/winston")().logger;
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const express = require("express");
const router = express.Router();
const csrfProtection = require("csurf")();
const { positions, lang, mysql_real_escape_string, alertRedirect } = require("../config/config");

const positionsLang = lang("positions");

function userDisplay(content) {
    return "user {" + content.position + "}[" + content.username + "(" + content.id + ")] " + content.name;
}

async function userExists(idUser, seqMan) {
    return (await seqMan.tables.user.findOne({
        attributes: ['id', 'position'],
        where: {
            id: idUser
        }
    })) != null;
}

async function positionReview(idUser, seqMan) {
    return {
        position: ((await seqMan.tables.user.findOne({
            attributes: ['id', 'position'],
            where: {
                id: idUser
            }
        })).position),
        requests: (await seqMan.tables.positionrequest.findAll({
            where: {
                userID: idUser
            }
        }))
    }
}

async function positionLookup(id, seqMan) {
    let user = await seqMan.tables.user.findOne({
        attributes: ['id', 'name', 'username', 'position'],
        where: {
            id: id
        }
    });

    return user;
}

async function positionRequest(idUser, into, seqMan) {
    if(!(await userExists(idUser, seqMan))) return false;

    into = into.trim();

    // 요청한 직책이 부적절한 경우: false
    if(!positions.includes(into)) {
        logger.error("A requested position does not exist.");
        return false;
    }

    let review = await positionReview(idUser, seqMan);
    // 요청한 직책이 이미 그 직책인 경우: true
    if(review.position == into) return true;

    // 기존 요청 검토하기
    if(review.requests.filter(x => x.current != x.next && !x.approved && x.processed == null && x.next == into).length > 0) {
        // 요청 각하
        return false; // (이미 있음)
    } else { // 요청 접수
        seqMan.tables.positionrequest.create({
            userID: idUser,
            current: review.position,
            next: into
        })
        return true;
    }
}

async function positionAlter(idUser, into, callerID, seqMan) {
    if(!(await userExists(idUser, seqMan)) || !(await userExists(callerID, seqMan))) return false;

    into = into.trim();

    // 요청한 직책이 부적절한 경우: false
    if(!positions.includes(into)) {
        logger.error("A requested position does not exist. [ALTER]");
        return false;
    }

    let review = await positionReview(idUser, seqMan);
    let CALLreview = await positionLookup(callerID, seqMan);
    
    if(CALLreview == null || !['chairman', 'genaff', 'executor'].includes(CALLreview.position)) {
        logger.error("Position Alter call by user given of id [" + callerID + "] is invalid due to the unknown user id or the position does not have authority.");
        return false;
    }

    // 요청한 직책이 이미 그 직책인 경우: true
    if(review.position == into) return true;

    // 기존 요청 검토하기
    let kk = review.requests.filter(x => x.current != x.next && !x.approved && x.processed == null && x.next == into);
    if(kk.length > 0) {
        logger.info("By the authority of " + userDisplay(CALLreview) + ", the request(s) of alterations of the position of the " + userDisplay((await positionLookup(idUser, seqMan))) + " from '" + review.position + "' to '" + into + "' has been processed.");
        await seqMan.tables.user.update({
            position: into
        }, {
            where: {
                id: idUser,
                position: review.position
            }
        });
        for(var i in kk) {
            seqMan.tables.positionrequest.update({
                approved: true,
                processed: sequelize.fn('NOW')
            }, {
                where: {
                    id: kk[i].id
                }
            });
        }
        return true;
    } else { // 요청 접수
        logger.info("By the authority of " + userDisplay(CALLreview) + ", the position has been altered of the " + userDisplay((await positionLookup(idUser, seqMan))) + " from '" + review.position + "' to '" + into + "'.");
        await seqMan.tables.user.update({
            position: into
        }, {
            where: {
                id: idUser,
                position: review.position
            }
        });
        return true;
    }
}

module.exports = function (seqMan) {
    router.get("/", (req, res) => {
        res.send(positionsLang);
    });

    router.post("/request", csrfProtection, async (req, res) => {
        let p = Object.keys(req.body);

        if(res.locals.validated) {
            if(p.includes("_csrf") && req.method.toLowerCase() == "post") {
                let positionInto = typeof req.body.position == "string" ? mysql_real_escape_string(req.body.position) : "";
                let p = await positionRequest(res.locals.user.id, positionInto, seqMan);
                alertRedirect(res, p ?
                    "성공적으로 직책 변경이 요청되었습니다.\n관리자의 승인 시까지 기다려 주십시오."
                    : "직책 변경에 실패하였습니다.\n잘못된 요청이거나, 처리되지 않은 동일한 내용의 요청이 존재할 수 있습니다.", "/user");
            }
        } else res.redirect("/user");
    });

    router.get("/alter/:id/:pos", csrfProtection, async (req, res) => {
        if(res.locals.validated) {
            let positionInto = typeof req.params.pos == "string" ? mysql_real_escape_string(req.params.pos) : "";
            let p = await positionAlter(req.params.id, positionInto, res.locals.user.id, seqMan);
            alertRedirect(res, p ?
                `사용자 ${req.params.id} 번에 대하여 성공적으로 직책 변경 처리 하였습니다.`
                : "직책 변경에 실패하였습니다. 시스템 오류를 확인하시기 바랍니다.", "/");
        } else res.redirect("/user");
    });

    return router;
}