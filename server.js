const express = require("express");
const app = express();
const api = require("./server/routes/transaction_API");
const path = require("path");
const dbManager = require("./server/bank-DB-Server");
const { port } = require("./constants");

const dbServer = new dbManager();
dbServer.connectToDB();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/transaction", api);

app.listen(process.env.PORT || port, function () {
  console.log(`Running on port ${port}`);
});
