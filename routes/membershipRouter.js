const { Router } = require("express");
const membershipController = require("../controllers/membershipController");

const membershipRouter = Router();

membershipRouter.get("/", membershipController.membershipGet);
membershipRouter.post("/", membershipController.membershipPost);

module.exports = membershipRouter;
