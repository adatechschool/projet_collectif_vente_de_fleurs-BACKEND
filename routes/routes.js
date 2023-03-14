const express = require("express");
const router = express.Router();

//on appelle la route dans controller:
const productControl = require("../controller/products");

//on connecte la route:
router.post("/products", productControl.createProduct);

module.exports = router;

