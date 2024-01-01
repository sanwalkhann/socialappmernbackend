const jwt = require("jsonwebtoken");
const { secret } = require("../utils");

exports.authenticateToken = (req, res, next) => {
    const token = req.header("Authorization");
  
    console.log("Received token:", token);
  

    const tokenWithoutBearer = token.replace("Bearer ", "");

    console.log("Received token in bearer:", tokenWithoutBearer);


    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Token not provided" });
    }
  
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        console.error("Token verification error:", err);
        return res.status(403).json({ message: "Forbidden - Invalid token" });
      }
      req.user = user;
      next();
    });
  };