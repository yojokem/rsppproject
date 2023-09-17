function randomSigns(t) {
    if(!(typeof t == 'string')) return "";

    function r(max, min) {
        return Math.random * (max - min) + min;
    }

    return t.replace("d", String(r(200, 4))).replace("D", String(r(200, 4) * r (20, 2)));
}

const cS = "D3F7AF7S8AA8F8AF8REWQJJDSAMdkssudgktpdyd";
const DB = {
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Police68194818!",
    multipleStatements: true,
    database: "rspp",
    connectionLimit: 80,
};

const lang = require("../language/index");

const regFailCauses = {
    /** System */
    0: lang("regFail")[0],
    /** Already username */
    1: lang("regFail")[1],
    /** Not typed : username */
    2: lang("regFail")[2],
    /** Not typed : password */
    3: lang("regFail")[3],
    /** Not typed : name */
    4: lang("regFail")[4],
    /** Not typed : code */
    5: lang("regFail")[5],
    /** Not typed : infringed error */
    6: lang("regFail")[6],
    /** Password and Password Confirm NOT Match */
    7: lang("regFail")[7],
    /** Not typed : password confirm */
    8: lang("regFail")[8],
    /** LENGTH : username */
    9: lang("regFail")[9],
    /** LENGTH : name */
    10: lang("regFail")[10],
    /** LENGTH : code */
    11: lang("regFail")[11],
    /** Unique name invalid */
    12: lang("regFail")[12]
};

const stylingEmojis = {
    NAME: "😊",
    USERNAME: "💾",
    PASSWORD: "🔐",
    CODE: "💍",
    POSITION: "💳"
};

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

function typeCheck(criteria, name, variable) {
    return criteria[name] == typeof variable;
}

function typeList(sample) {
    let k = Object.keys(sample);

    if(typeof sample != "object" || k.length == 0) return null;

    let criteria = {};

    for(var i in k) {
        criteria[k[i]] = typeof sample[k];
    }

    return criteria;
}

module.exports = {
    PORT: process.env.PORT || 8080,
    cookieSign: cS,
    sessionSign: randomSigns(cS),
    coDB: DB,
    soDB: {
        host: DB['host'],
        port: DB['port'],
        user: DB['username'],
        password: DB['password'],
        database: DB['database']
    },
    mysql_real_escape_string: mysql_real_escape_string,
    csrfRenderer: (res, view, token) => res.render(view, {"_csrf": token}),
    alertRedirect: (res, message, href) => {
        res.send(`
        <script type='text/javascript'>
        alert("${mysql_real_escape_string(message)}");
        location.href = '${href}';
        </script>
        `)
    },
    regFailCauses: regFailCauses,
    stylingEmojis: stylingEmojis,
    type: {
        typeCheck: typeCheck,
        typeList: typeList
    },
//    positions: ['party', 'genaff', 'agent', 'executor', 'chairman', 'auditor', 'abandoned', 'expelled', 'cancelled', 'none'],
    lang: lang,
    ruleOut: req => req.originalUrl.startsWith("/v") || req.originalUrl == "favicon.ico"
}