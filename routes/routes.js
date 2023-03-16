const express = require("express");
const router = express.Router();

//on appelle les routes depuis controller:
const productControl = require("../controller/products");
const orderControl = require("../controller/orders");
//on connecte les routes:
router.post("/products", productControl.createProduct);
router.post("/orders", orderControl.createOrder);


router.delete("/products/:id", productControl.deleteProduct);
router.patch("/products/:id", productControl.patchProduct);

router.get("/products", productControl.getProducts);
router.get("/products/:id", productControl.getProduct);


module.exports = router;
