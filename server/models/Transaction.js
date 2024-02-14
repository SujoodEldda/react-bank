const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  amount: Number,
  category: String,
  vendor: String,
  description: String,
});

const Transaction = mongoose.model("Transaction", TransactionSchema);
module.exports = Transaction;
