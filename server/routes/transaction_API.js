const express = require("express");
const router = express.Router();
const DBServer = require("../bank-DB-Server");
const {
  noTransactionFound,
  savedTransaction,
  canNotDelete,
} = require("../../constants");

const dbServer = new DBServer();

router.get("/", async function (req, res) {
  try {
    const transactions = await dbServer.getData();
    res.send(transactions);
  } catch (error) {
    res.send({ error: noTransactionFound });
  }
});

router.get("/one/:vendor", async function (req, res) {
  try {
    const transaction = await dbServer.getDataByVendor(req.params.vendor);
    res.send(transaction);
  } catch (error) {
    res.send({ error: noTransactionFound });
  }
});

router.get("/:category", async function (req, res) {
  try {
    const transaction = await dbServer.getCategoryData(req.params.category);
    res.send(transaction);
  } catch (error) {
    res.send({ error: noTransactionFound });
  }
});

router.post("/", async function (req, res) {
  try {
    const savedTransaction = await dbServer.saveData(req.body);
    res.send(savedTransaction);
  } catch (error) {
    res.send({ error: noTransactionToAdd });
  }
});

router.put("/:transactionID", async function (req, res) {
  try {
    const transactions = await dbServer.changeAmount(
      req.params.transactionID,
      req.body.amount
    );
    res.send(transactions);
  } catch (error) {
    res.send({ error: noTransactionFound });
  }
});

router.delete("/:vendor", async function (req, res) {
  try {
    const deletedTransaction = await dbServer.deleteData(req.params.vendor);
    res.send(deletedTransaction);
  } catch (error) {
    res.send({ error: canNotDelete });
  }
});

module.exports = router;
