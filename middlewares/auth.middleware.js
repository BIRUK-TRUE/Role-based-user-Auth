const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token provided Authorization denied" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      console.log(`the decoded token is ${decoded}`);
      next();
    } catch (error) {
      res.status(400).json({ message: "Invalid token" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "No token provided Authorization denied" });
  }
};
module.exports = verifyToken;
