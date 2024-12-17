exports.errorGet = (req, res) => {
    if (req.isAuthenticated()) {
        res.status(404).render("404")
    } else {
        res.redirect("/login")
    }
}