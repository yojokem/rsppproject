const logger = require("./config/winston")().logger;
const { lang } = require("./config/config");

async function updatePositions(seqMan) {
    return (await seqMan.tables.positions.findAll());
}

async function update(id, seqMan) {
    return (await seqMan.tables.user.findOne({
        attributes: ['name', 'position'],
        where: {
            id: id
        }
    }));
}

async function userExists(idUser, seqMan) {
    return (await seqMan.tables.user.findOne({
        attributes: ['id', 'position'],
        where: {
            id: idUser
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

logger.info(lang("$$L3"));

module.exports = function (seqMan) {
    return {
        imports: async function (req, res, next) { // res.locals에 넘겨줄 함수, 마지막에 호출된다.
            res.locals.positions = await updatePositions(seqMan);

            next();
        }
    };
}