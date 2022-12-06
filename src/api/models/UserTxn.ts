import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  from: String,
  to: String,
  value: String,
  isError: Boolean,
  gas: String,
  gasPrice: String,
  gasUsed: String
});


const userTxnSchema = new Schema({
  user_address: String,
  transactions: [TransactionSchema]
});

const userTxn = mongoose.model("user-txns", userTxnSchema);

export default userTxn;
