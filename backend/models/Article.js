
const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  image: String,

  status: {
    type: String,
    enum: ["draft", "published"],
    default: "published",
  },

  likes: {
    type: Number,
    default: 0,
  },

  views: {
    type: Number,
    default: 0,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Article", ArticleSchema);


// const mongoose = require("mongoose");

// const articleSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   date: { type: String, required: true },
//   description: { type: String },
//   image: { type: String, default: "" },
//   content: { type: String },
//   likes: { type: Number, default: 0 },
//   // ✅ AJOUT
//   views: { type: Number, default: 0 },
// });

// module.exports = mongoose.model("Article", articleSchema);


