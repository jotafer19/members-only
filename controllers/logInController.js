const passport = require("../config/passport")

exports.logInPost = (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/",
        failureFlash: true
    })(req, res, next)
}