const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");

//
// 🔹 1️⃣ Récupérer les commentaires d’un article
//
router.get("/:articleId", async (req, res) => {
  try {
    const comments = await Comment.find({ articleId: req.params.articleId }).sort({ date: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//
// 🔹 2️⃣ Ajouter un commentaire
//
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

//
// 🔹 3️⃣ Répondre à un commentaire
//
router.post("/:commentId/reply", async (req, res) => {
  const { author, text } = req.body;
  const { commentId } = req.params;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Commentaire non trouvé" });

    comment.replies.push({ author, text });
    await comment.save();

    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

//
// 🔹 4️⃣ Ajouter une réaction emoji
//
router.post("/:commentId/react", async (req, res) => {
  const { emoji } = req.body;
  const { commentId } = req.params;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Commentaire non trouvé" });

    comment.reactions.set(emoji, (comment.reactions.get(emoji) || 0) + 1);
    await comment.save();

    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

module.exports = router;


// const express = require("express");
// const router = express.Router();
// const Comment = require("../models/Comment");

// // 🔹 Récupérer les commentaires d’un article
// router.get("/:articleId", async (req, res) => {
//   try {
//     const comments = await Comment.find({ articleId: req.params.articleId }).sort({ date: -1 });
//     res.json(comments);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // 🔹 Ajouter un commentaire
// router.post("/:articleId", async (req, res) => {
//   try {
//     const { author, text } = req.body;
//     const newComment = new Comment({
//       articleId: req.params.articleId,
//       author: author || "Anonyme",
//       text,
//     });
//     await newComment.save();
//     res.json(newComment);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;
