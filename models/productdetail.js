var mongoose = require('mongoose');
const ProductDetails = mongoose.model('ProductDetails',
{
    productid: { type: String, index: true, required: true }, // Adding index to the productid field
    quantity: { type: Number, required: true },
});
module.exports = ProductDetails;