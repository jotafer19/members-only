const express = require("express")
const path = require("node:path")

const signUpRouter = require("./routes/signUpRouter")
const { error } = require("node:console")

const app = express()

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => res.send("Hello world"))
app.use("/sign-up", signUpRouter)

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send(err)
})

app.listen(3000, () => console.log("connected"))