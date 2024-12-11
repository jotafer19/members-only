const {Router} = require("express")
const messagesController = require("../controllers/messagesController")
const messagesRouter = Router()

messagesRouter.get("/create", messagesController.createMessageGet)
messagesRouter.post("/create", messagesController.createMessagePost)
messagesRouter.post("/:id/delete", messagesController.deleteMessagePost)

module.exports = messagesRouter;