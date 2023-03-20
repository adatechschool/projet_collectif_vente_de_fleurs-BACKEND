const jwt = require("jsonwebtoken");

// Ce middleware vérifie que le token fourni par le navigateur correspond à celui généré
// pour l'utilisateur lors de sa connexion
module.exports = (req, res, next) => {
  try {
    // récupération du token envoyé par la requête du navigateur
    const token = req.headers.authorization.split(" ")[1];
    //    vérification par la librairie jsonwebtoken
    const decodedToken = jwt.verify(token, "ACCESS_TOKEN_SECRET");
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
    // passage à la suite de la requête
    next();
  } catch (error) {
    res.status(401).json("Utilisateur non reconnu, veuillez vous reconnecter");
  }
};
