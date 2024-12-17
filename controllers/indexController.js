const asyncHandler = require("express-async-handler");
const db = require("../db/query");

exports.indexGet = asyncHandler(async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }

  const allMessages = await db.getAllMessages();
  const isMember = req.user.membership_status;

  if (!allMessages) {
    throw new Error("Can not get messages");
  }

  res.render("index", { messages: allMessages, isMember: isMember });
});
