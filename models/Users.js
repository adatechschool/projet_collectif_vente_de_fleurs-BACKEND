const mongoose = require("mongoose");

const crypto = require ( 'crypto' );

const User = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: 'email already exists',
        match: [ /. +\@. +\.. + /, 'Please give a valid email address' ]
    },
    // firstname: {
    //     type: String,
    //     required: true,
    // }, 
    // lastname: {
    //     type: String,
    //     required: true,
    //},
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


User.statics.generateSalt = function() {
    return Math.round((new Date().valueOf() * Math.random())) + ''
},

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

module.exports = mongoose.model('Users', User);