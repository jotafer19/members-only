exports.indexGet = (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/login")
    }
    res.render("index")
}