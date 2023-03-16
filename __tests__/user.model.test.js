const mongoose = require( 'mongoose' )

mongoose.Promise = global.Promise

mongoose.connect ('mongodb+srv://audoyen:nXoki9yv3OlRbErW@cluster0.ebuau1c.mongodb.net/test', {
    //Current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option:
    useNewUrlParser: true
})
mongoose.connection.on( 'error', () => {
  throw new Error(`unable to connect to database: `)
})

const User = require ( '../models/Users' )

describe ( "User Password Authentication", () => {
    it("should generate the same hash given the same password text and salt", () => {
        try {
          let salt = User.generateSalt()
          let hash = User.generateHash("qwer213", salt)
          expect(hash).toEqual(User.generateHash("qwer213", salt))
        }
        catch (err) {
          throw new Error(err)
        }
    });
    it("should save a user with hash and salt attributes", async () => {
    try {
        let result = await new User({ email: "sam@ed.info", password: 'qwer213'}).save()
        expect(Object.keys(result._doc)).toEqual(expect.arrayContaining( ['salt', 'hash']))
    }
    catch (err) {
        throw new Error(err)
    }
    });
});



//Une fois les tests effectués, on ferme la connexion
//(les fonctions Jest s'appellent sans "function")
afterAll( async () => {
    try {
      await mongoose.connection.close()
    } catch (err) {
      console.log(err)
    }
})