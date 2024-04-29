const config = require("../config.json");
const mongoose = require("mongoose");
const conenctionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
const client = mongoose.connect(config.connectionString,conenctionOptions)
async function startSession() { 
  return (await client).startSession();
}

mongoose.Promise = global.Promise;

module.exports = {
  User: require("../models/user"),
  Product: require("../models/product"),
  Order: require("../models/order"),
  ProductDetails: require("../models/productdetail"),
  startSession
};