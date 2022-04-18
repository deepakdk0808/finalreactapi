require("dotenv").config();
const jwt = require("jsonwebtoken")

const Admin = require("../models/admin.model");

const newToken = (admin) => {
    //console.log(process.env);
    return jwt.sign({ admin }, process.env.JWT_SECRET_KEY);
};

const register = async (req, res) => {
    try {
        //we will try to find the user with the email provided
        let admin = await Admin.findOne({ email: req.body.email }).lean().exec();

        //if the user is found then it is an error
        if (admin)
            return res.status(400).send({ message: "Please try another email" });

        //if user is not found then we will create the user with the email and the password provided
        admin = await Admin.create(req.body) //we are trying to work with the user model because that is where the password is stored
        //user = new User()
        //user.email = req.body.email
        //user.password = req.body.password
        //user.save();

        //register => secret -> hash // ewgfgwgwfryyor kefhhfk
        //login => secret -> hash // compare login hash with register
        //hash amd if both are same then password is correct
        //hashing => string => hashes it => cannot get the original string back
        //encryption => string => encrypt => encrypted string => decrypt => original string

        //then we will hash the password to make the password more secure

        // then we will create the token for that user

        const token = newToken(admin);

        //then return the user and the token

        res.send({ admin, token });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const login = async (req, res) => {
    try {
        //we will try to find the user with the email provided
        const admin = await Admin.findOne({ email: req.body.email });

        //if user is not found then return error
        if (!admin)
            return res.status(400).send({ message: "Please try another email or email" });


        //if user is found then we will match the passwords
        const match = admin.checkPassword(req.body.password)

        if (!match)
            return res.status(400).send({ message: "Please try another email or email" });

        //if passwords match then we will create the token
        const token = newToken(admin);

        //then return the user and the token

        res.send({ admin, token });

        res.send("Login");
    } catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports = { register, login };