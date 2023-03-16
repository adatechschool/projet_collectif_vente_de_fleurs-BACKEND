//on importe la librairie mongoose qui permet de créer le model:
const mongoose = require("mongoose");

//création du model Orders:
const Orders = mongoose.model("Orders", {
  userID: {
    type: String,
    unique: true,
  },
  owner: {
    // Owner va stocker un ObjectId, qui est un identifiant unique généré par MongoDB
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // revoir comment est nommé dans le champs dans table user
  },
  product: [
    {
      productID: { type: String },
      name: { type: String },
      price: { type: Number },
      quantity: { type: Number },
    },
  ],
  priceTotal: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
  },
  address: {
    numberStreet: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
});

//on export le model pour pouvoir l'utiliser dans controller/orders.js:
module.exports = Orders;
