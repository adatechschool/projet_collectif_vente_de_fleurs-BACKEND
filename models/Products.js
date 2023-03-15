const mongoose = require("mongoose");

const Product = mongoose.model("Products", {
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  category: {
    fleur: { type: Boolean },
    plante: { type: Boolean },
    intérieur: { type: Boolean },
    extérieur: { type: Boolean },
  },
  stock: {
    type: Number,
    required: true,
  },
});

module.exports = Product;
