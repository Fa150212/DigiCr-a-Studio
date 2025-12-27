const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.cookies?.admin_token;
  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // 👈 IMPORTANT
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
