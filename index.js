require("dotenv").config();
const express = require("express");
const passport = require("passport");
const connection = require("./connection");
const Poem = require("./models/poem_structure");
const cors = require("cors");
const poemsRouter = require("./routes/poem.js");
const User = require("./models/user");
const userRouter = require("./routes/user");
const {
  registerStrategy,
  loginStrategy,
  verifyStrategy,
} = require("./middleware/auth");

const app = express();

app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use("/poems", poemsRouter);
app.use("/user", userRouter);

passport.use("register", registerStrategy);
passport.use("login", loginStrategy);
passport.use(verifyStrategy);

app.listen(process.env.PORT, () => {
  connection.authenticate();
  Poem.sync({ alter: true });
  User.sync({ alter: true });
  console.log("App is online");
});
