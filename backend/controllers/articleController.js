const Article = require("../models/Article");

// ✅ GET articles (pagination)
const getArticles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;

    const total = await Article.countDocuments();
    const articles = await Article.find()
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      articles,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur chargement articles" });
  }
};

// ✅ GET dernier article
const getLastArticle = async (req, res) => {
  try {
    const article = await Article.findOne().sort({ date: -1 });
    if (!article) {
      return res.status(404).json({ message: "Aucun article trouvé" });
    }
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: "Erreur récupération dernier article" });
  }
};

// ✅ GET article par ID
const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article non trouvé" });
    }
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: "Erreur récupération article" });
  }
};

// ✅ POST créer article
const createArticle = async (req, res) => {
  try {
    const { title, date, description, image, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Titre et contenu obligatoires" });
    }

    const article = new Article({
      title,
      date,
      description,
      image,
      content,
    });

    await article.save();
    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({ message: "Erreur création article" });
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



module.exports = {
  getArticles,
  getLastArticle,
  getArticleById,
  createArticle,
  likeArticle,

};
