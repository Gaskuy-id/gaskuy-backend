const jwt = require("jsonwebtoken");
const { findUserById } = require("../services/mongoose/users");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await findUserById(decoded.userId)
    req.user = user
    next();
  } catch (error) {
    next(error)
  }
};

module.exports = authMiddleware
