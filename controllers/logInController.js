const passport = require("../config/passport")

exports.logInGet = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect("/")
    }
    res.render("log-in-form")
}

exports.logInPost = (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    })(req, res, next)
}