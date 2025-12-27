const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(401).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, admin.passwordHash);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: admin._id, name: admin.name, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("admin_token", token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 7 * 24 * 3600 * 1000,
  });

  res.json({ success: true, admin: { name: admin.name, email: admin.email } });
};

exports.checkAdmin = (req, res) => {
  res.json({ admin: req.admin });
};

exports.logoutAdmin = (req, res) => {
  res.clearCookie("admin_token");
  res.json({ success: true });
};

