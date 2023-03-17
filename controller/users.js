const User = require("../models/Users");

//PARTIE ENCRYPTAGE MDP
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-Base64");

//route signup
exports.createUser = async (req, res) => {
  try {
    const { email, firstname, lastname, password } = req.body;
    const salt = uid2(120);
    const hash = SHA256(salt + password).toString(encBase64);

    //vérifier que tous les champs sont remplis
    if (email && firstname && lastname && password) {
      //vérifier que l'utilisateur n'existe pas déjà dans la BDD
      const mailCheck = await User.findOne({ email: email }); //va chercher l'email dans les champs email des tables
      if (mailCheck) {
        res.status(400);
        res.json("Email already exists");
        res.end();
      } else {
        const newUser = new User({
          email: email,
          firstname: firstname,
          lastname: lastname,
          hash: hash,
          salt: salt,
        });
        await newUser.save();
        res.status(200);
        res.json("ok");
        res.end();
      }
    } else {
      res.status(400);
      res.json("Missing information");
      res.end();
    }
  } catch (error) {
    res.status(400);
    res.json("Could not create your account", error);
    res.end();
  }
};

//route signin
exports.checkUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      const hashCheck = SHA256(user.salt + password).toString(encBase64);
      if (hashCheck === user.hash) {
        res.status(200);
        res.json("User connected");
        res.end();
      } else {
        res.status(400);
        res.json("Email or password not valid");
        res.end();
      }
    } else {
      res.status(400);
      res.json("User not found 2");
      res.end();
    }
  } catch (error) {
    res.status(400);
    res.json("Could not check user", error);
    res.end();
  }
};
