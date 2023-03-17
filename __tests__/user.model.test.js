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
// Ce test permet de tester le model qui sera appelé pour construire la route
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
        let result = await new User({ email: "sam@ed.info", firstname: 'Sam', lastname:'Dupont', password: 'qwer213'}).save()
        expect(Object.keys(result._doc)).toEqual(expect.arrayContaining( ['salt', 'hash']))
    }
    catch (err) {
        throw new Error(err)
    }
    });
    it("should throw an error if the password value is empty", async () => {
      try {
        await new User({
          username: "sam",
          email: "sam@ed.info",
          password: ""
        }).save()
      } catch (err) {
        expect(err.errors.password.message).toEqual("Password is required")
      }
    });
    it("should throw an error if password length is less than 6", async () => {
      try {
        await new User({
          username: "sam",
          email: "sam@ed.info",
          password: "123"
        }).save()
      } catch (err) {
        expect(err.errors.password.message).toEqual("Password must be at least 6 characters.")
      }
    });
    it("should throw an error if authentication is given a wrong password", async () => {
      try {
        await new User({ email: "sam@ed.info", firstname: "sam", lastname:'Dupont', password: 'qwer213'}).save()
        let result = await User.findOne({ email: "sam@ed.info" })
        let wrongPassword = "123456"
        let auth = User.authenticate(wrongPassword, result.hash, result.salt)
        expect(auth).toEqual(false)
      }
      catch (err) {
        throw new Error(err)
      }
    });
    it("should authenticate successfully if given correct password", async () => {
      try {
        await new User({ email: "sam@ed.info", firstname: "sam", lastname:'Dupont', password: 'qwer213'}).save()
        let result = await User.findOne({ email: "sam@ed.info" })
        let rightPassword = "qwer213"
        let auth = User.authenticate(rightPassword, result.hash, result.salt)
        expect(auth).toEqual(true)
      }
      catch (err) {
        throw new Error(err)
      }
    })
});

// Cette fonction de jest permet de ne pas enregistrer dans la base de données les données testées
afterEach(async () => {
  try {
    await User.deleteMany({})
  } catch (err) {
    console.log(err)
  }
})

//Une fois les tests effectués, on ferme la connexion
//(les fonctions Jest s'appellent sans "function")
afterAll( async () => {
    try {
      await mongoose.connection.close()
    } catch (err) {
      console.log(err)
    }
})