require("dotenv").config();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// 🔧 Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 📦 Storage Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "articles",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

// 🎯 Controller
const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Aucune image reçue" });
  }

  // ✅ URL Cloudinary
  res.status(200).json({
    imageUrl: req.file.path,
  });
};

module.exports = { upload, uploadImage };
