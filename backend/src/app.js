const express = require("express");
const cors = require("cors");
const info = require("./routes/info");
const auth = require("./routes/auth");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(info);
app.use(auth);
app.use(
  cors({
    origin: "*",
  })
);

module.exports = app;
