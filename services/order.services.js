const jwt = require("jsonwebtoken");
const db = require("../helpers/db");
// const aa = require("../node_modules/socket.io/client-dist/socket.io");
const { default: mongoose } = require("mongoose");
const Order = db.Order;
const ProductDetails = db.ProductDetails;


//retrieving all orders
async function getAll() {
  return await Order.find();
}
//retrieving order using id
async function getById(id) {
  console.log("finding id: ", id);
  return await Order.findById(id);
}

//adding Order to db
async function create(orderParam) {
    const session = await db.startSession();
    await session.startTransaction();
    try {        
        //create order obj
        const newOrder = new Order(orderParam);
        const productdetail = await ProductDetails.findOne({productid : orderParam.productid });
      
        if(productdetail.quantity - orderParam.quantity < 0){
            throw "Insuficient Product Quantity."
        }
        // Update quantity in product details here
        productdetail.quantity = productdetail.quantity - orderParam.quantity;
        await productdetail.save();
        await newOrder.save();
        // broadcasting new order information to Admins, Supports Live Order View to proceed with the order process
        global.io.emit('newOrder', { newOrder });
        // If both transactions are succeeds, then commit the transactions
        await session.commitTransaction();
       
    } catch (error) {
        // Rollback changes if order creation fails  
        await session.abortTransaction();
        await session.endSession();              
        throw error;
    }
}

async function update(id, orderParam) {
  const order = await Order.findById(id);
  //validate the id and username
  if (!order) throw "Order not found.";
  //copy the order obj
  Object.assign(order, orderParam);
  await order.save();
  // Updating the record in live view
  const newOrder = new Order(order);
  global.io.emit('newOrder', { newOrder });
}

async function _delete(id) {
  await Order.findByIdAndRemove(id);
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};