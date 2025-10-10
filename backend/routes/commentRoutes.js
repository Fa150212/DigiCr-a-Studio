const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");

// 🔹 Récupérer les commentaires d’un article
router.get("/:articleId", async (req, res) => {
  try {
    const comments = await Comment.find({ articleId: req.params.articleId }).sort({ date: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔹 Ajouter un commentaire
router.post("/:articleId", async (req, res) => {
  try {
    const { author, text } = req.body;
    const newComment = new Comment({
      articleId: req.params.articleId,
      author: author || "Anonyme",
      text,
    });
    await newComment.save();
    res.json(newComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
