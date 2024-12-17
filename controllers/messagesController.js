const { body, validationResult } = require("express-validator");
const db = require("../db/query");

exports.createMessageGet = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  res.render("create-message-form");
};

const validateMessage = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 50 })
    .withMessage("Title cannot exceed 50 characters long"),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters long"),
];

exports.createMessagePost = [
  validateMessage,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("create-message-form", {
        oldInput: req.body,
        errors: errors.array(),
      });
    }
    const { title, description } = req.body;
    const user = req.user;
    const date = new Date()
    await db.addNewMessage(title, date, description, user.id);
    res.redirect("/");
  },
];

exports.deleteMessagePost = async (req, res) => {
  const { id } = req.params;
  await db.deleteMessage(id);
  res.redirect(req.get("Referrer") || "/");
};
