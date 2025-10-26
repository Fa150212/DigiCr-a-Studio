// controllers/articleController.js
const Article = require("../models/Article");

// ✅ GET — Tous les articles avec pagination

const getArticles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3; // 👈 affiche 3 articles par page
    const skip = (page - 1) * limit;

    const total = await Article.countDocuments();
    const articles = await Article.find()
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      articles,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors du chargement des articles", error });
  }
};


// ✅ GET — Article par ID
const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article non trouvé" });
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de l'article", error });
  }
};

// ✅ POST — Créer un article
const createArticle = async (req, res) => {
  try {
    const { title, date, description, image, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Le titre et le contenu sont obligatoires." });
    }

    const newArticle = new Article({ title, date, description, image, content, likes: 0 });
    await newArticle.save();

    res.status(201).json({ message: "Article créé avec succès ✅", article: newArticle });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de l'article", error });
  }
};

// ✅ POST — Incrémenter les likes
const likeArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article non trouvé" });

    article.likes = (article.likes || 0) + 1;
    await article.save();

    res.json({ likes: article.likes });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors du like", error });
  }
};

// ✅ GET — Dernier article publié
const getLastArticle = async (req, res) => {
  try {
    const lastArticle = await Article.findOne().sort({ date: -1 }); // tri décroissant
    if (!lastArticle) return res.status(404).json({ message: "Aucun article trouvé" });
    res.json(lastArticle);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du dernier article", error });
  }
};

module.exports = { getArticles, getArticleById, createArticle, likeArticle, getLastArticle  };
