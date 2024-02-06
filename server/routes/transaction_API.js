const express = require("express");
const router = express.Router();
const DBServer = require("../bank-DB-Server");
const { port } = require("dotenv").config();

const dbServer = new DBServer();

router.get("/transaction", async function (req, res) {
  try {
    res.send("hello");
  } catch (error) {
    res.send({ error: "no hello" });
  }
});
module.exports = router;
