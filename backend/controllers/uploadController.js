require("dotenv").config();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// 🔧 Configuration Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 📦 Configuration du stockage sur Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "articles", // dossier dans Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

// 🎯 Contrôleur
const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Aucune image reçue" });
  }
  // Cloudinary renvoie l’URL dans req.file.path
  res.json({ imageUrl: req.file.path });
};

module.exports = { upload, uploadImage };
