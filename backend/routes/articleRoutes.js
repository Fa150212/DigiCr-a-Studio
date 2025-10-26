
const express = require("express");
const router = express.Router();
const {
  getArticles,
  getArticleById,
  createArticle,
  likeArticle,
  getLastArticle,
} = require("../controllers/articleController");

// 🔹 Récupérer le dernier article
router.get("/last", getLastArticle);

// 🔹 Récupérer les articles (avec pagination)
router.get("/", getArticles);

// 🔹 Récupérer un article par ID
router.get("/:id", getArticleById);

// 🔹 Créer un nouvel article
router.post("/", createArticle);

// 🔹 Incrémenter les likes
router.post("/:id/like", likeArticle);

module.exports = router;
