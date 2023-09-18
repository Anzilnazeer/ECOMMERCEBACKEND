const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY, async (err, user) => {
      if (err) res.status(403).json("Invalid Token");
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("you are not authenticated");
  }
};
module.exports = { verifyToken };
