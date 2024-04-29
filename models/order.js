var mongoose = require('mongoose');
const Order = mongoose.model('Order',
    {
        productid: String,
        name: String,
        type: String,
        price: Number,
        quantity: Number,
        amount: Number,
        date: { type: Date, default: Date.now },
        status: { type: String, default: 'Pending' },
        updatedate: Date
    });
module.exports = Order;