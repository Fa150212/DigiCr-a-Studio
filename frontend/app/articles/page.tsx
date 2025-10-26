"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaLinkedinIn,
  FaTwitter,
  FaFacebookF,
  FaBookOpen,
  FaNewspaper,
  FaArrowLeft,
  FaRegCalendarAlt,
} from "react-icons/fa";

export default function LastArticlePage() {
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLastArticle = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/articles/last");
        const data = await res.json();
        setArticle(data);
      } catch (error) {
        console.error("Erreur de chargement :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLastArticle();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500 animate-pulse">
        Chargement du dernier article...
      </p>
    );

  if (!article)
    return (
      <p className="text-center mt-10 text-gray-500">
        Aucun article trouvé 😢
      </p>
    );

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      {/* 🧭 Titre principal */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <FaNewspaper className="text-gray-900 text-3xl" />
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900">
          Dernier Article Publié
        </h1>
      </div>

      {/* 📰 Titre de l'article */}
      <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-900 mb-10">
        {article.title}
      </h2>

      <div className="grid md:grid-cols-3 gap-8 items-start">
        {/* Contenu principal */}
        <div
          className="md:col-span-2 space-y-6 text-gray-700 leading-relaxed max-h-[400px] overflow-y-auto pr-2"
          style={{
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE/Edge
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          <p className="flex items-center gap-2 text-gray-500 text-sm italic">
            <FaRegCalendarAlt /> {article.date}
          </p>

          <p>{article.content || "Contenu non disponible pour cet article."}</p>
        </div>

        {/* Image + Partage */}
        <div className="flex flex-col items-center md:items-start">
          {article.image ? (
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-56 object-cover rounded-xl shadow-md"
            />
          ) : (
            <div className="w-full h-56 bg-gray-200 rounded-xl"></div>
          )}

          {/* 🔗 Icônes de partage */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FaBookOpen className="text-orange-500" /> Partagez
            </h3>
            <div className="flex space-x-4">
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=http://localhost:3000/article/${article._id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center bg-gray-800 text-white rounded-full hover:bg-blue-700 transition"
              >
                <FaLinkedinIn />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=http://localhost:3000/article/${article._id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center bg-gray-800 text-white rounded-full hover:bg-sky-500 transition"
              >
                <FaTwitter />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=http://localhost:3000/article/${article._id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center bg-gray-800 text-white rounded-full hover:bg-blue-600 transition"
              >
                <FaFacebookF />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 🔙 Bouton "Voir tous les articles" */}
      <div className="text-center mt-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg font-semibold transition"
        >
          <FaArrowLeft /> Voir tous les articles
        </Link>
      </div>
    </main>
  );
}
