const express = require("express");
const router = express.Router();
const orderServices = require("../services/order.services");
const Role = require("../helpers/role");
const jwt = require("../helpers/jwt");
const { join } = require('node:path');
//routes
router.post("/register",jwt(), register);
router.get("/", jwt([Role.Admin, Role.Support]), getAll);
router.get("/view", getAllView); // for the sake of testing, i didn't put token here
router.get("/:id", jwt(), getById);
router.put("/:id", jwt([Role.Admin, Role.Support]), update);
router.delete("/:id",jwt(Role.Admin), _delete);

module.exports = router;

//route functions
function register(req, res, next) {
    orderServices
    .create(req.body)
    .then((order) =>
      res.json({
        order: order,
        message: `Order Registered successfully with ordername ${req.body.name}`,
      })
    )
    .catch((error) => next(error));
}
function getAllView(req, res, next) {
  res.sendFile(join(__dirname, '../htmls/orderview.html'));
}
function getAll(req, res, next) {
  const currentUser = req.auth;
  orderServices
    .getAll()
    .then((orders) => res.json(orders))
    .catch((err) => next(err));
}

function getById(req, res, next) {
    orderServices
    .getById(req.params.id)
    .then((order) => {
      if (!order) {
        res.status(404).json({ message: "Order Not Found!" });
        next();
      }
      return res.json(order);
    })
    .catch((error) => next(error));
}

function update(req, res, next) {
    orderServices
    .update(req.params.id, req.body)
    .then(() =>
      res.json({
        message: `Order with id: ${req.params.id} updated successfully.`,
      })
    )
    .catch((error) => next(error));
}

function _delete(req, res, next) {
    orderServices
    .delete(req.params.id)
    .then(() =>
      res.json({
        message: `Order with id: ${req.params.id} deleted successfully.`,
      })
    )
    .catch((error) => next(error));
}