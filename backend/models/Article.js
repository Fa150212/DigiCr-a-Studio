
const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    content: String,
    image: String,
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true } // 🔥 TRÈS IMPORTANT
);

module.exports = mongoose.model("Article", ArticleSchema);



