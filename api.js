// api.js
const express = require("express");
const app = express();

app.get("/user", (req, res) => {
  const password = "123456";
  res.send(password);
});

app.listen(3000);
