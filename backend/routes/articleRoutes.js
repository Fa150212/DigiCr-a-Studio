const express = require("express");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

const {
  getArticles,
  getLastArticle,
  getArticleById,
  createArticle,
  likeArticle,
} = require("../controllers/articleController");

// 🔹 Dernier article
router.get("/last", getLastArticle);

// 🔹 Tous les articles (pagination)
router.get("/", getArticles);

// 🔹 Article par ID
router.get("/:id", getArticleById);

// 🔹 Créer un article
router.post("/", adminAuth, createArticle);

// 🔹 Incrémenter les likes
router.post("/:id/like", likeArticle);

module.exports = router;
