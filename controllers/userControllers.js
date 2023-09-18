const User = require("../models/User");
module.exports = {
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      console.log({ user });
      const { password, __v, createdAt, ...userData } = user;
      console.log({ password, __v, createdAt, userData, user });
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getDelete: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.user.id);
      res.status(200).json("User deleted.");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
