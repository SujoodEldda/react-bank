const Transaction = require("./models/Transaction");
const mongoose = require("mongoose");

class DBServer {
  connectToDB() {
    mongoose
      .connect(
        process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Transaction_DB"
      )
      .catch((err) => console.log(err));
  }

  async deleteData(vendor) {
    const deletedTransaction = await Transaction.findOneAndDelete({ vendor });
    return deletedTransaction;
  }

  async getData() {
    const transactions = await Transaction.find({});
    return transactions;
  }
  async getCategoryData(category) {
    const categoryTransactions = await Transaction.find({ category });
    return categoryTransactions;
  }
  async getDataByVendor(vendor) {
    const categoryTransactions = await Transaction.find({ vendor });
    return categoryTransactions;
  }

  async saveData(transaction) {
    const newTransaction = new Transaction(transaction);
    newTransaction.save();
    return newTransaction;
  }
}

module.exports = DBServer;
