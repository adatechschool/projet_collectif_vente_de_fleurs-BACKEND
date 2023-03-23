//on import le model Oders :
const Order = require("../models/Orders");

//on détermine (en asynchrone) la fonction et on l'export:

exports.createOrder = async (req, res) => {
  try {
    //destructuring :
    // const { userID, product, priceTotal, date, adresse } = req.body;
    
    //const { userId, productId, name, price, quantity } = req.body;

    //const { userId } = req.body;

    // let product = {
    //   productId : productId,
    //   name: name,
    //   price: price,
    //   quantity : quantity
    // }

    //nouvelle commande :
    const newOrder = new Order({
      userId: req.body.userId,
      products: req.body.products
    });
    await newOrder.save();
    console.log(newOrder)
    res.status(201);
    res.json("Order confirmed !");
    res.end()
  } catch (error) {
    // si le code trouve une erreur type400, alors affiche le message suivant:
    res.status(400);
    console.log(error)
    res.json("Failed : ", error);
    res.end();
  }
};
