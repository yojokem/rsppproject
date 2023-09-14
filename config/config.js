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

const regFailCauses = {
    /** System */
    0: "시스템 에러. 관리자에게 문의하십시오.",
    /** Already username */
    1: "이미 사용 중인 사용자 이름입니다. 다른 것으로 시도하세요.",
    /** Not typed : username */
    2: "사용자 이름을 입력하지 않으셨습니다. 다시 시도하세요.",
    /** Not typed : password */
    3: "비밀번호를 입력하지 않으셨습니다. 다시 시도하세요.",
    /** Not typed : name */
    4: "성명을 입력하지 않으셨습니다. 다시 시도하세요.",
    /** Not typed : code */
    5: "복구 코드를 입력하지 않으셨습니다. 다시 시도하세요.",
    /** Not typed : infringed error */
    6: "registration failed due to unknown cause(s). infringed."
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
    regFailCauses: regFailCauses
}