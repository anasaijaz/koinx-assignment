import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userTxnSchema = new Schema({
  a_string: String,
  a_date: Date,
});

const userTxn = mongoose.model("user-txns", userTxnSchema);

export default userTxn;
