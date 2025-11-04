const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  articleId: { type: mongoose.Schema.Types.ObjectId, ref: "Article", required: true },
  author: String,
  text: String,
  date: { type: Date, default: Date.now },
  // ✅ Ajout des réponses
  replies: [
    {
      author: String,
      text: String,
      date: { type: Date, default: Date.now },
    },
  ],
  // ✅ Réactions emojis
  reactions: {
    type: Map,
    of: Number,
    default: { "❤️": 0, "🔥": 0, "👍": 0, "😂": 0 },
  },
});

module.exports = mongoose.model("Comment", commentSchema);


// const mongoose = require("mongoose");

// const commentSchema = new mongoose.Schema({
//   articleId: { type: mongoose.Schema.Types.ObjectId, ref: "Article", required: true },
//   author: { type: String, default: "Anonyme" },
//   text: { type: String, required: true },
//   date: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Comment", commentSchema);
