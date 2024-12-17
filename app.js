const express = require("express")
const path = require("node:path")
const session = require("express-session");
const passport = require("./config/passport")
const flash = require("connect-flash")
require("dotenv").config()

// Routes import
const indexRouter = require("./routes/indexRouter")
const signUpRouter = require("./routes/signUpRouter")
const logInRouter = require("./routes/logInRouter")
const logOutRouter = require("./routes/logOutRouter")
const membershipRouter = require("./routes/membershipRouter")
const messagesRouter = require("./routes/messagesRouter")
const userRouter = require("./routes/userRouter")
const errorRouter = require("./routes/404Router")

// App init
const app = express()

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(session({
    secret: "cats", 
    resave: false, 
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000, secure: process.env.NODE_ENV === "production"}
}))
app.use(passport.session());
if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1)
}

app.use(flash())
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next()
})

app.use((req, res, next) => {
    res.locals.flashMessages = req.flash()
    next()
})

app.use(express.static(path.join(__dirname, "public")))

app.use("/", indexRouter)
app.use("/sign-up", signUpRouter)
app.use("/login", logInRouter)
app.use("/logout", logOutRouter)
app.use("/membership", membershipRouter)
app.use("/messages", messagesRouter)
app.use("/user", userRouter)
app.use("*", errorRouter)

app.use((err, req, res, next) => {
    const errMsg = err.message || "Something went wrong"
    res.status(err.status || 500).render("error", { error: errMsg })
})

app.listen(3000, () => console.log("connected"))