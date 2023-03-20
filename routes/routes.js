const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

//on appelle les routes depuis controller:
const productControl = require("../controller/products");
const orderControl = require("../controller/orders");
const userControl = require("../controller/users");

//on connecte les routes:
router.post("/products", auth, productControl.createProduct);
router.post("/orders", auth, orderControl.createOrder);

router.delete("/products/:id", auth, productControl.deleteProduct);
router.patch("/products/:id", auth, productControl.patchProduct);

router.get("/products", auth, productControl.getProducts);
router.get("/products/:id", auth, productControl.getProduct);

router.post("/users/signup", auth, userControl.createUser);
router.post("/users/signin", auth, userControl.checkUser);

module.exports = router;
