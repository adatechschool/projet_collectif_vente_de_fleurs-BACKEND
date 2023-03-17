const User = require("../models/Users");

exports.createUser = async (req, res) => {
    try {
        const { email, firstname, lastname, password } = req.body;
        const newUser = new User({
            email: email,
            firstname: firstname,
            lastname: lastname,
            password: password
        });
        await newUser.save();
        res.status(200);
        res.json("ok");
        res.end();
    } catch (error) {
        res.status(400);
        res.json("Could not create your account", error);
        res.end();
    }
}