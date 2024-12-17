const { Router } = require("express");
const logOutController = require("../controllers/logOutController");
const logOutRouter = Router();

logOutRouter.get("/", logOutController.logOutGet);

module.exports = logOutRouter;
