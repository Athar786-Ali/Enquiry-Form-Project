const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers["auth-token"];

  if (!token) {
    return res.status(401).json({ status: 0, msg: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id: userId }
    next();
  } catch (error) {
    return res.status(401).json({ status: 0, msg: "Invalid token" });
  }
};
