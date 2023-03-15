const express = require("express");
const router = express.Router();

//on appelle les routes depuis controller:
const productControl = require("../controller/products");
const orderControl = require("../controller/orders");
//on connecte les routes:
router.post("/products", productControl.createProduct);
router.post("/orders", orderControl.createOrder);

module.exports = router;
