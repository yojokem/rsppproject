const logger = require("../config/winston")().logger;
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const { positions, lang } = require("../config/config");
const express = require("express");
const router = express.Router();
const {mysql_real_escape_string, alertRedirect} = require("../config/config");

const positionsLang = lang("positions");

function userDisplay(content) {
    return "user {" + content.position + "}[" + content.username + "(" + content.id + ")] " + content.name;
}

async function positionReview(idUser, seqMan) {
    return {
        position: (await seqMan.tables.user.findOne({
            attributes: ['id', 'position'],
            where: {
                username: username
            }
        }).position),
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
    if(review.requests.filter(x => x.current != x.next && x.approved && x.processed != null && x.next == into).length > 0) {
        // 요청 각하
        return false; // (이미 있음)
    } else { // 요청 접수
        seqMan.tables.positionrequest.create({
            userID: idUser,
            current: review.position,
            next: into,
            
        })
        return true;
    }
}

async function positionAlter(idUser, into, callerID, seqMan) {
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

    return router;
}