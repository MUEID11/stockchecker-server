require("dotenv").config();

const jwt = require("jsonwebtoken");
const jwtVerify = async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorize access" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Forbidden access" });
    }

    req.user = decoded;
    next();
  });
};

module.exports = { jwtVerify };
