const User = require("../models/Users");

exports.createUser = (req, res) => {
    try {
        User.init() // permet de régler le problème du asynchrone et utliser la clé "unique" définie dans le Schema
            .then(async ()=> {
                const { email, firstname, lastname, password } = req.body;
                const mailCheck = await User.findOne({ email:email })
                if (mailCheck) {
                    res.status(400);
                    res.json("Email already exists");
                    res.end();
                } else {
                    const newUser = new User({
                        email: email,
                        firstname: firstname,
                        lastname: lastname,
                        password: password
                    });
                }
                await newUser.save();
                res.status(200);
                res.json("ok");
                res.end();
            });
    } catch (error) {
        res.status(400);
        res.json("Could not create your account", error);
        res.end();
    }
};

exports.checkUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email: email});
        const checkPassword = User.authenticate(password, user.hash, user.salt);
        if (user && checkPassword) {
            res.status(200);
            res.json("User connected");
            res.end();
        } else {
            res.status(400);
            res.json("Email or password not valid");
            res.end();
        }

    } catch (error) {
        res.status(400);
        res.json("Could not check user", error);
        res.end();
    }
}