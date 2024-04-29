const jwt = require("jsonwebtoken");
const db = require("../helpers/db");
const ProductDetails = db.ProductDetails;

//retrieving all ProductDetails
async function getAll() {
  return await ProductDetails.find();
}
//retrieving ProductDetails using id
async function getById(id) {
  console.log("finding id: ", id);
  return await ProductDetails.findOne({ "productid" : id });
}

//adding Product to db
async function create(productDetailParam) {
  //check if product exist
  const productdetail = await ProductDetails.findOne({ name: productDetailParam.productid });
  //validate
  if (productdetail) throw `This productid already exists: ${productDetailParam.productid}`;

  //create product obj
  const newProductDetail = new ProductDetails(productDetailParam);
  await newProductDetail.save();
}

async function update(id, productDetailParam) {
  const productDetail = await ProductDetails.findOne({ productid: id });
  //validate the id and productname
  if (!productDetail) throw "product not found.";
  if (
    productDetail.productid !== productDetailParam.productid &&
    (await ProductDetails.findOne({ name: productDetailParam.productid }))
  ) {
    throw `product with productid ${productDetailParam.productid} already exist.`;
  }
  //copy the product obj
  Object.assign(productDetail, productDetailParam);
  await productDetail.save();
}

async function _delete(id) {
  const productid = await ProductDetails.find({productid : id })
  await ProductDetails.findByIdAndRemove(productid);
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};