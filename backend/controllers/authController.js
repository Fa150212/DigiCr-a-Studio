require("dotenv").config();

const loginAdmin = async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Mot de passe requis" });
  }

  if (password === process.env.ADMIN_PASSWORD) {
    // ✅ Authentification réussie
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Mot de passe incorrect" });
  }
};

module.exports = { loginAdmin };
