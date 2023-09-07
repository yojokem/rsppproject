module.exports = {
    userSessionCheck: function (req, res, next) {
        res.locals.user = req.session.user; //'user' is one's full credential

        next();
    }
}