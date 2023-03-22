const Product = require("../models/Products");

//on détermine la route "créer un produit" (en asynchrone) et on export la fonction dans routes.js:
exports.createProduct = async (req, res) => {
  try {
    //destructuring:
    const {
      name,
      description,
      price,
      size,
      stock,
      images,
      fleur,
      plante,
      intérieur,
      extérieur,
    } = req.body;

    // création catégorie :

    let categories = {
      fleur: fleur,
      plante: plante,
      intérieur: intérieur,
      extérieur: extérieur,
    };

    //nouveau produit:
    const newProduct = new Product({
      name: name,
      description: description,
      images: images,
      price: price,
      size: size,
      category: categories,
      stock: stock,
    });

    //enregistrement de la nouvelle plante dans la BDD:
    await newProduct.save();
    res.status(201);
    res.json("Product created !");
    res.end();
  } catch (error) {
    //si ça ne fonctionne pas, afficher l'erreur:
    res.status(400);
    res.json("Could not create product : ", error);
    res.end();
  }
};

//SUPPRIMER une plante de la BDD
exports.deleteProduct = async (req, res) => {
  try {
    //si l'id de la plante a bien été transmis:
    if (req.body.id) {
      //on cherche la plante à partir de son id dans la BDD et on la supprime:
      await Product.findByIdAndDelete(req.body.id);
      res.status(201).json("Product deleted !");
      //sinon, si aucun id n'a été transmis:
    } else {
      res.status(400);
      res.json("Missing id");
      res.end();
    }
  } catch (error) {
    res.status(400);
    res.json("Could not delete product : ", error);
    res.end();
  }
};

//MODIFIER une plante dans le BDD
exports.patchProduct = async (req, res) => {
  try {
    //on récupère les modifications dans le body
    const updateRequest = {
      name: req.body.name,
      description: req.body.description,
      images: req.body.images,
      price: req.body.price,
      size: req.body.size,
      category: req.body.category,
      stock: req.body.stock,
    };
    //on cherche la plante à partir de son id dans la BDD:
    const productToUpdate = await Product.findOne({ _id: req.params.id });
    //on remplace les données initiales par les nouvelles si elles sont dans l'objet updateRequest
    //sinon, on garde les données ititiales (productToUpdate)
    productToUpdate.name = updateRequest.name ?? productToUpdate.name;
    productToUpdate.description =
      updateRequest.description ?? productToUpdate.description;
    productToUpdate.images = updateRequest.images ?? productToUpdate.images;
    productToUpdate.price = updateRequest.price ?? productToUpdate.price;
    productToUpdate.size = updateRequest.size ?? productToUpdate.size;
    productToUpdate.category =
      updateRequest.category ?? productToUpdate.category;
    productToUpdate.stock = updateRequest.stock ?? productToUpdate.stock;
    //on remplace l'objet intiial dans la BDD par le nouvel objet modifié productToUpdate:
    await Product.updateOne({ _id: req.params.id }, { $set: productToUpdate });
    res.status(201);
    res.json("Product updated !");
    res.json(productToUpdate);
    res.end();
  } catch (error) {
    res.status(400);
    res.json("Could not patch product : ", error);
    res.end();
  }
};

//On détermine la route "lire tous les produits" (en asynchrone) et on export la fonction dans routes.js:
exports.getProducts = async (req, res) => {
  try {
    let products = await Product.find().lean();
    res.status(200);
    res.json(products);
    res.end();
  } catch (error) {
    res.status(400);
    res.json("Failed to load the products : ", error);
    res.end();
  }
};

//On détermine la route "lire UN produit" (en asynchrone) et on export la fonction dans routes.js:
exports.getProduct = async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.params.id }).lean();
    res.status(200);
    res.json(product);
    res.end();
  } catch (error) {
    res.status(400);
    res.json("Failed to load the product : ", error);
    res.end();
  }
};
