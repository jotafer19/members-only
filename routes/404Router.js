const {Router} = require("express")
const errorController = require("../controllers/404Controller")
const errorRouter = Router()

errorRouter.get("/", errorController.errorGet)

module.exports = errorRouter;