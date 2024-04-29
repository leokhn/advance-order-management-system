const jwt = require("jsonwebtoken");
const db = require("../helpers/db");
const Product = db.Product;

//retrieving all Products
async function getAll() {
  return await Product.find();
}
//retrieving Product using id
async function getById(id) {
  console.log("finding id: ", id);
  return await Product.findById(id);
}

//adding Product to db
async function create(productParam) {
  //check if product exist
  const product = await Product.findOne({ name: productParam.name });
  //validate
  if (product) throw `This productname already exists: ${productParam.name}`;

  //create product obj
  const newProduct = new Product(productParam);
  await newProduct.save();
}

async function update(id, productParam) {
  const product = await Product.findById(id);
  //validate the id and productname
  if (!product) throw "product not found.";
  if (
    product.name !== productParam.name &&
    (await Product.findOne({ name: productParam.name }))
  ) {
    throw `product with productname ${productParam.name} already exist.`;
  }
  //copy the product obj
  Object.assign(product, productParam);
  await product.save();
}

async function _delete(id) {
  await Product.findByIdAndRemove(id);
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};