const asyncHandler = require("express-async-handler")
const db = require("../db/query")

exports.userGet = asyncHandler(async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/login")
    }

    if (!req.user.membership_status) {
        return res.redirect("/")
    }

    const { id } = req.params
    const user = await db.getUserById(id)
    const userMessages = await db.getMessagesByUser(id)

    if (!userMessages) {
        throw new Error("Can not get user messages")
    }

    res.render("user-page", { user: user, messages: userMessages })
})