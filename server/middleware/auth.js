const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token =
      req.headers["authorization"].split(" ")[1] ||
      req.body.token ||
      req.query.token;

    if (!token) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(403).json({ message: "Not authorized" });
    }
  } catch (error) {
    return res.status(500).json({ message: "middleware not passed" });
  }
};

module.exports = { auth };
