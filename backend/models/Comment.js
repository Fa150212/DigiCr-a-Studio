const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  articleId: { type: mongoose.Schema.Types.ObjectId, ref: "Article", required: true },
  author: { type: String, default: "Anonyme" },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", commentSchema);
