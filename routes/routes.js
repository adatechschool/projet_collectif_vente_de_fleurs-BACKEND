const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

//on appelle les routes depuis controller:
const productControl = require("../controller/products");
const orderControl = require("../controller/orders");
const userControl = require("../controller/users");

//on connecte les routes:

// Routes administrateur : créer, supprimer, modifier les produits
router.post("/products", authAdmin, productControl.createProduct);
router.delete("/products/:id", authAdmin, productControl.deleteProduct);
router.patch("/products/:id", authAdmin, productControl.patchProduct);

// Routes utilisateur : créer une commande, créer un compte, s'identifier
router.post("/orders", orderControl.createOrder);
router.post("/users/signup", userControl.createUser);
router.post("/users/signin", userControl.checkUser);

// Routes générales pour le fonctionnement du site : voir tous les produits/utilisateurs,
//  obtenir les infos d'un produit/d'un utilisateur
router.get("/products", productControl.getProducts);
router.get("/products/:id", productControl.getProduct);
router.get("/users", userControl.getUsers);
router.get("/users/:id", userControl.getUser);

module.exports = router;
