const {Router} = require("express")
const logInController = require("../controllers/logInController")
const logInRouter = Router()

logInRouter.post("/", logInController.logInPost)

module.exports = logInRouter;