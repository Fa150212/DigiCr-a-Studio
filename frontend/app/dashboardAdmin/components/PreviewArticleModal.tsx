
"use client";

import { motion } from "framer-motion";

export default function PreviewArticleModal({ article, onClose }: any) {
  const formattedDate = article?.date
    ? new Date(article.date).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 overflow-y-auto">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-xl p-6 w-full max-w-3xl my-10"
      >
        {/* 🔙 Retour haut */}
        <button
          onClick={onClose}
          className="text-sm text-gray-500 mb-4 hover:text-blue-600"
        >
          ← Retour
        </button>

        {/* 🖼️ Image */}
        {article.image && (
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 object-cover rounded mb-6"
          />
        )}

        {/* 📝 Titre */}
        <h1 className="text-3xl font-bold mb-2">
          {article.title}
        </h1>

        {/* 📅 Date */}
        {formattedDate && (
          <p className="text-gray-500 mb-6">
            Publié le {formattedDate}
          </p>
        )}

        {/* 📄 Contenu */}
        <div className="prose max-w-none whitespace-pre-line">
          {article.content}
        </div>

        {/* 🔒 Bouton fermer BAS */}
        <div className="mt-10 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Fermer
          </button>
        </div>
      </motion.div>
    </div>
  );
}

