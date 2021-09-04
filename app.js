const cors = require("cors");
const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

const users = [{ email: "test@test.com", password: "12345678" }];
const tokens = [];

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const auth =
    users.filter((user) => user.email === email && user.password === password)
      .length > 0;
  if (auth) {
    const token = jwt.sign({ email: email }, "secret");
    tokens.push(token);
    res.status(200).json(token);
  } else {
    res.status(401).send({});
  }
});

app.post("/isAuth", (req, res) => {
  const { token } = req.body;
  if (tokens.includes(token)) {
    res.status(200).send({});
  } else {
    res.status(401).send({});
  }
});

module.exports = app;
