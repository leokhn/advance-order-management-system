const express = require("express");
const router = express.Router();
const productDetailServices = require("../services/productdetail.services");
const Role = require("../helpers/role");
const jwt = require("../helpers/jwt");
//routes

router.post("/register",jwt([Role.Admin, Role.Support]), register);
router.get("/", jwt([Role.Admin, Role.Support]), getAll);
router.get("/:id", jwt(), getById);
router.put("/:id", jwt([Role.Admin, Role.Support]), update);
router.delete("/:id",jwt(Role.Admin), _delete);

module.exports = router;

//route functions
function register(req, res, next) {
    productDetailServices
    .create(req.body)
    .then((productDetail) =>
      res.json({
        productDetail: productDetail,
        message: `productDetail Registered successfully with productid ${req.body.productid}`,
      })
    )
    .catch((error) => next(error));
}

function getAll(req, res, next) {
  const currentUser = req.auth;
  productDetailServices
    .getAll()
    .then((productDetails) => res.json(productDetails))
    .catch((err) => next(err));
}


function getById(req, res, next) {
    productDetailServices
    .getById(req.params.id)
    .then((productDetail) => {
      if (!productDetail) {
        res.status(404).json({ message: "productDetail Not Found!" });
        next();
      }
      return res.json(productDetail);
    })
    .catch((error) => next(error));
}

function update(req, res, next) {
    productDetailServices
    .update(req.params.id, req.body)
    .then(() =>
      res.json({
        message: `productDetail with id: ${req.params.id} updated successfully.`,
      })
    )
    .catch((error) => next(error));
}

function _delete(req, res, next) {
    productDetailServices
    .delete(req.params.id)
    .then(() =>
      res.json({
        message: `productDetail with productid: ${req.params.id} deleted successfully.`,
      })
    )
    .catch((error) => next(error));
}