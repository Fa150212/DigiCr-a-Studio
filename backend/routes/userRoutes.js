const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ✅ Enregistrer ou mettre à jour un utilisateur venant de Google
router.post("/google-login", async (req, res) => {
  try {
    const { name, email, image } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      // Mise à jour image/nom si changé
      user.name = name;
      user.image = image;
      await user.save();
    } else {
      // Création nouveau user
      user = await User.create({ name, email, image });
    }

    res.json(user);
  } catch (err) {
    console.error("Erreur Google Login:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ✅ Récupérer un utilisateur par email
router.get("/by-email/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.json(user);
  } catch (err) {
    console.error("Erreur findByEmail:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ✅ Mettre à jour le profil utilisateur
router.put("/:id", async (req, res) => {
  try {
    const { bio, twitter, linkedin } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { bio, twitter, linkedin },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Erreur de mise à jour :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
