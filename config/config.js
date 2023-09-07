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
    csrfRenderer: (res, view, token) => res.render(view, {"_csrf": token})
}