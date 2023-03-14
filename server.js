const express = require("express");

//Créer le serveur
const app = express();
const port = 3000;

//Middleware = plugin ajouté au serveur pour récupérer des paramètres de type Body
app.use(express.json());

//Appeler les routes
const routes = require("./routes/routes.js");
app.use(routes);
//Si la route n'existe pas :
app.all("*", (request, response) => {
    response.json("Page not found");
})

//Démarrer le serveur et écouter les requêtes du port 3000
app.listen(port, () => {
    try {
        console.log("Server has started at port " + port);
    } catch(error) {
        console.log(error);
    }
})