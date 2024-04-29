const express = require("express");
const router = express.Router();
const productServices = require("../services/product.services");
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
    productServices
    .create(req.body)
    .then((product) =>
      res.json({
        product: product,
        message: `product Registered successfully with productname ${req.body.name}`,
      })
    )
    .catch((error) => next(error));
}

function getAll(req, res, next) {
  const currentUser = req.auth;
  productServices
    .getAll()
    .then((products) => res.json(products))
    .catch((err) => next(err));
}


function getById(req, res, next) {
  productServices
    .getById(req.params.id)
    .then((product) => {
      if (!product) {
        res.status(404).json({ message: "product Not Found!" });
        next();
      }
      return res.json(product);
    })
    .catch((error) => next(error));
}

function update(req, res, next) {
    productServices
    .update(req.params.id, req.body)
    .then(() =>
      res.json({
        message: `product with id: ${req.params.id} updated successfully.`,
      })
    )
    .catch((error) => next(error));
}

function _delete(req, res, next) {
    productServices
    .delete(req.params.id)
    .then(() =>
      res.json({
        message: `product with id: ${req.params.id} deleted successfully.`,
      })
    )
    .catch((error) => next(error));
}