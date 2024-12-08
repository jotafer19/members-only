const { body, validationResult } = require("express-validator")
const db = require("../db/query")

require("dotenv").config()

exports.membershipGet = (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/")
    }
    res.render("membership-form")
}

const validateCode = [
    body("code")
        .trim()
        .custom(value => {
            if (value !== process.env.SECRET_CODE) {
                throw new Error("The code is not valid")
            }

            return true;
        })
]

exports.membershipPost = [
    validateCode,
    async (req, res) => {
        const errors = validationResult(req)
        
        if (!errors.isEmpty()) {
            return res.status(400).render("membership-form", {
                errors: errors.array()
            })
        }
        
        const user = req.user
        await db.upgradeMembership(user)
        res.redirect("/")
    }
]