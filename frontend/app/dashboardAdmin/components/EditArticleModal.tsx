"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function EditArticleModal({ article, onClose, onSave }: any) {
  const [title, setTitle] = useState(article.title);
  const [content, setContent] = useState(article.content);
  const [date, setDate] = useState(
    article.date ? article.date.slice(0, 10) : ""
  );

  const handleSubmit = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/articles/${article._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, content, date }),
      }
    );

    const updated = await res.json();
    onSave(updated);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl p-6 w-full max-w-lg"
      >
        <h2 className="text-xl font-bold mb-4">Modifier l’article</h2>

        <input
          className="w-full border p-2 mb-3 rounded"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Titre"
        />

        <input
          type="date"
          className="w-full border p-2 mb-3 rounded"
          value={date}
          onChange={e => setDate(e.target.value)}
        />

        <textarea
          className="w-full border p-2 mb-4 rounded h-40"
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Contenu"
        />

        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-100 rounded">
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Enregistrer
          </button>
        </div>
      </motion.div>
    </div>
  );
}
