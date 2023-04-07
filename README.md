# WonderFlower_backend
Naviguez sur le site __[Wonder Flower](https://wonderflower.vercel.app/)__ -- voir le repo __[WonderFlower_frontend](https://github.com/adatechschool/projet_collectif_vente_de_fleurs-FRONTEND/tree/main)__

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)


__*5<sup>ème</sup> projet proposé par [Ada Tech School](https://adatechschool.fr/) : Site e-commerce*__

## Présentation du projet 
- __Dates:__ du 13 au 23 Mars 2023
- __Collaborateurs:__ [Audrey Doyen](https://github.com/Dre-Drey), [Angéla Duton](https://github.com/Angy41), [Anastasia Korotkova](https://github.com/Nastiakor), [Angelina Liborom](https://github.com/AngelinaLbm), [Hélène Veber](https://github.com/HeleneVeber), [Iris Gaudin](https://github.com/irisgaudin), [Marie Koscianski-Ducharlet](https://github.com/MarieKosDuc), [Morgane Lepine Utter](https://github.com/morganelepine), [Rouhullah KARIMI](https://github.com/Huor97)
- __Objectifs:__ 
  - Concevoir un site e-commerce 
  - Créer des comptes donnant des droits différents aux utilisateurs: 
      - Une page admin permettant la gestion du stock.
      - Une page client permettant d'effectuer une commande
  - Décider la stack techinique en équipe: MERN
  - Concevoir l'archicteture du projet
  - Etre capable de changer de rôle au cours du projet et récupérer le code des autres (l'équipe est scindée en 2, une partie commence en front et l'autre en back, à la deuxième semaine les rôles sont inversés)

## Réalisation du Projet

### Installation locale du projet et stack utilisée
API réalisée avec __Node.js__ et __Express.js__. Pour installer ce back-end et ses librairies, utiliser la commande npm install.
Cette API fait le lien entre le front-end et la base de données non-relationnelle MongoDB.

### Organisation des fichiers
Code organisé selon le schéma Modèle-Route-Contrôleur :
 - Le modèle crée une collection MongoDB
 - La route définit l'URI (endpoint) de l'API (type de requête HTTP pris en charge, endpoint)
 - Le contrôleur fait le lien entre la route et le modèle, et gère le transfert d'informations entre l'API et la base de données

### Routes d'authentification
Avec la librairie __jsonwebtoken__, génération et envoi d'un token d'authentification lors de la connexion de l'utilisateur ou de l'administrateur (clé secrète différente pour les administrateurs et les utilisateurs).
Middleware de vérification du token pour les requêtes de création de commande (utilisateur) et de gestion de stock (administrateur).

### Base de données et API cloud
Utilisation de MongoDB Atlas pour l'hébergement cloud de la base de données. API hébergée sur Vercel (exemple : [Produits](https://wonderouman.vercel.app/products) ). Hébergement des images hors base de données sur Cloudinary.




