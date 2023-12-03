const logger = require("./config/winston")().logger;
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();
const {PORT, cookieSign, stylingEmojis, lang} = require("./config/config");
const eSession = require("./eSession");
const sessionManager0 = require("./sessionManager");
const positionManager0 = require("./positionManager");

logger.info(lang('$L1'));

// Application Initialization //

app.set('views', path.join(__dirname, "./views"));
app.set('view engine', 'ejs');
app.set('trust proxy', true);

const seqMan = require("./sequelManager");
const sessionManager = sessionManager0(seqMan);
const positionManager = positionManager0(seqMan);

// [1] Middlewares and Configuration

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser(cookieSign));
app.use(eSession);
app.use(sessionManager.userCheck);
app.use(sessionManager.userSessionCheck);
app.use(sessionManager.imports);
app.use(positionManager.imports);
//////////////////////////////////////////////////////////////////////app.use(positionManager.imports);
app.use((req, res, next) => {res.locals.stylingEmojis = stylingEmojis; next();});
app.use('/v/bootstrap', express.static(path.join(__dirname, "./node_modules/bootstrap/dist")));
app.use('/v/jquery', express.static(path.join(__dirname, "./node_modules/jquery/dist")));
app.use('/v/style', express.static(path.join(__dirname, "./styles")));
app.use('/v/scripts', express.static(path.join(__dirname, "./scripts")));
app.use('/v/fonts', express.static(path.join(__dirname, "./fonts")))

app.use(helmet.hidePoweredBy());
app.use(helmet.noSniff());
app.use(helmet.xssFilter());

// [2] Router Handling

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/favicon.ico", (req, res) => {
    res.sendFile(res.locals.viewDir("../favicon.ico"));
});

app.get("/informative", (req, res) => {
    res.render("informative");
});

app.get("/copyrights", (req, res) => {
    res.render("copyrights");
});

const router_User = require("./routers/user")(seqMan);
app.use("/user", router_User);
const router_Position = require("./routers/position")(seqMan);
app.use("/positions", router_Position);

const router_Post = require("./routers/post")(seqMan);
app.use("/post", router_Post);

const router_Collect = require("./routers/collect")(seqMan);
app.use("/collect", router_Collect);

// End of Initialization //

app.listen(PORT, function () {
    logger.info(lang('$L2'));
})

logger.info(lang('$L3'));