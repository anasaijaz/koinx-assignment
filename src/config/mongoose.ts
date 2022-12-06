import mongoose from "mongoose";

const username = encodeURIComponent("developer");
const password = encodeURIComponent("developer");
const cluster = "cluster0.deidv.mongodb.net";
let uri = `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority`;

mongoose.set("strictQuery", true);

mongoose.connect(uri).then(onConnected).catch(onError);

async function onConnected(mongoose) {
  console.log("Connected to Mongo");
}

async function onError(error) {
  console.log("Error connecting to Mongo");
}
