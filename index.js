require("dotenv").config();
const express = require("express");
const connection = require("./connection");
const Poem = require("./models/poem_structure");
const cors = require("cors");
const poemsRouter = require("./routes/poem.js");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/poems", poemsRouter);

app.listen(process.env.PORT, () => {
  connection.authenticate();
  Poem.sync({ alter: true });
  console.log("App is online");
});
