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


// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const Admin = require("../models/Admin");

// const JWT_SECRET = process.env.JWT_SECRET || "password123";

// exports.loginAdmin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Option rapide: allow fallback to ADMIN_PASSWORD if you didn't create admin user
//     const adminFromDb = await Admin.findOne({ email });
//     if (adminFromDb) {
//       const match = await bcrypt.compare(password, adminFromDb.passwordHash);
//       if (!match) return res.status(401).json({ success: false, message: "Invalid credentials" });
//       const token = jwt.sign({ id: adminFromDb._id, role: "admin" }, JWT_SECRET, { expiresIn: "7d" });
//       res.cookie("admin_token", token, { httpOnly: true, sameSite: "lax", maxAge: 7*24*3600*1000 });
//       return res.json({ success: true });
//     }

//     // fallback: if no admin user and ADMIN_PASSWORD env matches, allow login with any email
//     if (process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD) {
//       const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "7d" });
//       res.cookie("admin_token", token, { httpOnly: true, sameSite: "lax", maxAge: 7*24*3600*1000 });
//       return res.json({ success: true });
//     }

//     return res.status(401).json({ success: false, message: "Invalid credentials" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// exports.checkAdmin = (req, res) => {
//   const token = req.cookies.admin_token;
//   if (!token) return res.status(200).json({ admin: false });
//   try {
//     jwt.verify(token, JWT_SECRET);
//     return res.json({ admin: true });
//   } catch {
//     return res.status(200).json({ admin: false });
//   }
// };

// exports.logout = (req, res) => {
//   res.clearCookie("admin_token", { path: "/" });
//   res.json({ success: true });
// };
