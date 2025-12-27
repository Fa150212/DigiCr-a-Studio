const express = require("express");
const router = express.Router();

const {
  getArticles,
  getLastArticle,
  getArticleById,
  createArticle,
  likeArticle,
  deleteArticle,
  updateArticle,
} = require("../controllers/articleController");

const protect = require("../middleware/protect");
const requireAdmin = require("../middleware/requireAdmin");

// 🔹 Public
// 🔹 Dernier article
router.get("/last", getLastArticle);

// 🔹 Tous les articles (pagination)
router.get("/", getArticles);

// 🔹 Article par ID
router.get("/:id", getArticleById);

// 🔹 Créer un article
// 🔹 Incrémenter les likes
router.post("/:id/like", likeArticle);

// 🔒 Admin uniquement
router.post("/", protect, requireAdmin, createArticle);
router.delete("/:id", protect, requireAdmin, deleteArticle);
router.put("/:id", protect, requireAdmin, updateArticle);

module.exports = router;

