const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  content: { type: String },
  likes: { type: Number, default: 0 },
});

module.exports = mongoose.model("Article", articleSchema);

