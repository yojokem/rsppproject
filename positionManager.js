const logger = require("./config/winston")().logger;
const { lang, ruleOut } = require("./config/config");

// 구체적인 User의 position에 대하여 따지지 않고,
// Position 그 자체에 대해서만 관리함.

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

async function registerPosition(called, level, seqMan) {
    called = typeof called == "string" ? called.trim() : "";
    if(called == "" || typeof level != "number") {
        logger.error("A Registration Try has failed due to wrong given context.");
        return false;
    }

    if((await positionExists(called, seqMan))) {
        logger.error("A Registration Try about '" + called + "' has failed because the position already exists.");
        return false;
    }

    logger.info("New Position has been registered. '" + called + "'(" + level + ")");

    return (await seqMan.tables.positions.create({
        called: called,
        level: level
    }));
}

async function updatePositions(seqMan) {
    return (await seqMan.tables.positions.findAll());
}

/** @deprecated */
async function updateUser(idUser, position, seqMan) {
    return (await seqMan.tables.user.update({
        position: position
    }, {
        where: {
            id: idUser
        }
    }));
}

/** @deprecated */
async function userExists(idUser, seqMan) {
    return (await seqMan.tables.user.findOne({
        attributes: ['id', 'position'],
        where: {
            id: idUser
        }
    })) != null;
}

async function equal(level, idUser, seqMan) {

}

async function over(level, idUser, seqMan) {
    
}

async function less(level, idUser, seqMan) {
    
}

async function positionExists(called, seqMan) {
    return (await seqMan.tables.positions.findOne({
        where: {
            called: called
        }
    })) != null;
}

logger.info(lang("$$L3"));

module.exports = function (seqMan) {
    function positionsList (data) {
        let p = [];

        if(data) data.forEach(x => p.push(x.called));

        return p;
    }

    return {
        positionsList: async () => positionsList(await updatePositions(seqMan)),
        positionExists: positionExists,
        imports: async function (req, res, next) { // res.locals에 넘겨줄 함수, 마지막에 호출된다.
            if(ruleOut(req)) {
                next();
                return;
            }

            res.locals.positions = positionsList(await updatePositions(seqMan));

            next();
        }
    };
}