const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

module.exports = {
  createUser: async (req, res) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET
      ).toString(),
      location: req.body.location,
    });
    try {
      await newUser.save();
      res.status(201).json({ message: "User created" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      !user && res.status(401).json({ message: "Couldn't find the email." });
      const decryptedpass = CryptoJS.AES.decrypt(
        user.password,
        process.env.SECRET
      );
      const thepassword = decryptedpass.toString(CryptoJS.enc.Utf8);

      thepassword !== req.body.password &&
        res.status(400).json({ message: "Username and password not match" });
      const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
        expiresIn: "7d",
      });
      const { password, __v, createdAt, ...others } = user._doc;
      res.status(200).json({ ...others, usertoken: token });
    } catch (error) {
      res.status(500).json({ message: "Failed to Log In" });
    }
  },
};
