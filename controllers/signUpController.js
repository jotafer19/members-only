const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../db/query")

const validateUser = [
    body("firstName")
        .trim()
        .notEmpty()
        .isLength({ min: 1, max: 50 }).withMessage("First name must be between 1 and 50 characters"),
    body("lastName")
        .trim()
        .notEmpty()
        .isLength({ min: 1, max: 50 }).withMessage("Last name must be between 1 and 50 characters"),
    body("username")
        .trim()
        .notEmpty()
        .normalizeEmail()
        .isEmail().withMessage("You should enter a valid email")
        .custom(async value => {
            const allEmails = await db.getAllEmails()
            const isUsed = allEmails.find(email => email.username === value.toLowerCase())

            if (isUsed) {
                throw new Error("Email is already in use")
            }
        }),
    body("password")
        .trim()
        .isLength({ min: 4, max: 16}).withMessage("Password must be between 4 and 16 characters")
        .matches(/[A-Z]/).withMessage("Password should contain at least an uppercase letter")
        .matches(/[a-z]/).withMessage("Password should contain at least a lowercase letter")
        .matches(/[\d]/).withMessage("Password should contain at least a digit"),
    body("confirmPassword")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not match")
            }
            return true;
        })
]

exports.signUpGet = (req, res) => {
    res.render("sign-up-form")
}

exports.signUpPost = [
    validateUser,
    (req, res, next) => {
        const errors = validationResult(req)
        
        if (!errors.isEmpty()) {
            return res.status(400).render("sign-up-form", {
                errors: errors.array()
            })
        }

        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
            if (err) {
                return next(err);
            }

            try {
                await db.addNewUser({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    username: req.body.username,
                    password: hashedPassword
                })

                res.redirect("/")
            } catch(dbErr) {
                return next(dbErr)
            }
        })
    }
]