const express = require("express");
const router = express.Router();
const {
  getProduct,
  getProducts,
  addProduct,
  buyProduct,
  sellProduct,
} = require("./product.control");

// get all products
router.get("/", getProducts);

// get product by id
router.get("/:id", getProduct);

// add new product
router.post("/", addProduct);

// buy producty
router.put("/buy/:id", buyProduct);

// sell product
router.put("/sell/:id", sellProduct);

module.exports = router;
