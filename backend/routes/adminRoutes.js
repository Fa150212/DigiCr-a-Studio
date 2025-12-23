const express = require("express");
const { loginAdmin, checkAdmin, logoutAdmin } = require("../controllers/adminController");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/check", adminAuth, checkAdmin);
router.post("/logout", logoutAdmin);

module.exports = router;


