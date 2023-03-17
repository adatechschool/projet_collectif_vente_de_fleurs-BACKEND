const mongoose = require("mongoose");

const crypto = require ( 'crypto' );

const User = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: 'email already exists',
    },
    firstname: {
        type: String,
        required: true,
    }, 
    lastname: {
        type: String,
        required: true,
    },
    hash: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    // address: {
    //     numberStreet : {
    //         type: String,
    //         required: true,
    //     },
    //     zipCode: {
    //         type: String,
    //         required: true,
    //     },
    //     city: {
    //         type: String,
    //         required: true,
    //     },
    // },

});

// Méthode qui permet de générer un salt unique
User.statics.generateSalt = function() {
    return Math.round((new Date().valueOf() * Math.random())) + ''
},

//Méthode qui permet de générer un hash du password et du salt unique
//.statics permet de définir des méthodes liées au model entier et pas seulement à une seule instance
User.statics.generateHash = function(password, salt) {
    try {
    //Calling createHmac method
      const hmac = crypto.createHmac('sha256',salt)
      // updating data
      hmac.update(password)
      // Encoding to be used
      return hmac.digest('hex')
    } catch (err) {
      return err
    }
}

// Méthode qui permet d'enregistrer le salt et le hash dans la base de donnée
//.virtual permet de ne pas enregistré une propriété dans la base de donnée (elle pourrait être aussi utilisée pour les emails...)
User
.virtual('password')

.set(function(password) {
this._password = password
this.salt = this.model('Users').generateSalt()
this.hash = this.model('Users').generateHash(password, this.salt)
})

.get(function() {
return this._password
})

// Cette méthode permet d'imposer des règles à la création du password.
//.path vérifie que le chemin du hash est valide en fonction du password (.path reste un peu flou)
User.path('hash').validate(function(v) {
    if (this._password && this._password.length < 6) {
      this.invalidate('password', 'Password must be at least 6 characters.')
    }
    if (this.isNew && !this._password) {
      this.invalidate('password', 'Password is required')
    }
}, null)

//Méthode qui permet d'autentifier la connexion de l'utilisateur
User.statics.authenticate = function(given_password, hash, salt) {
    return User.statics.generateHash(given_password, salt) === hash
}



module.exports = mongoose.model('Users', User);