//on import le model Oders :
const Order = require("../models/Orders");

//on détermine (en asynchrone) la fonction et on l'export:

exports.createOrder = async (req, res) => {
  try {
    //destructuring :
    // const { userID, product, priceTotal, date, adresse } = req.body;
    
    const { userId, productId, name, price, quantity } = req.body;

    let product = {
      productId : productId,
      name: name,
      price: price,
      quantity : quantity
    }

    //nouvelle commande :
    const newOrder = new Order({
      userId: userId,
      // owner: req.user, //fait reference a l'user_id (la personne qui fait la commande)
      products: product,
      // priceTotal: priceTotal, //comment additionner les prix ? ici ?
      // date: date,
      // adresse: adresse,
    });
    await newOrder.save();
    res.status(201).json("Order confirmed !");
  } catch (error) {
    // si le code trouve une erreur type400, alors affiche le message suivant:
    res.status(400).json("Failed : ", error);
  }
};
