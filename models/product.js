var mongoose = require('mongoose');
const Product = mongoose.model('Product',
{
    type: String,
    name: { type: String, index: true, required: true },  // Adding index to the product name field
    price: Number,
    date: { type: Date, default: Date.now }
});
module.exports = Product;