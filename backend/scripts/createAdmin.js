require("dotenv").config();
const connectDB = require("../config/db");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

(async () => {
  await connectDB();
  const email = process.argv[2];
  const password = process.argv[3];
  if (!email || !password) {
    console.log("Usage: node createAdmin.js fg8002220@gmail.com password123");
    process.exit(1);
  }
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  const admin = await Admin.create({ email, passwordHash, name: "Fatou II" });
  console.log("Admin created:", admin.email);
  process.exit(0);
})();

