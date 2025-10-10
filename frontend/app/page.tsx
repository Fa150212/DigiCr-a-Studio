
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // 🔁 Charger les articles
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/articles?page=${page}&limit=3`);
      const data = await res.json();
      setArticles(data.articles);
      setTotalPages(data.totalPages);
      setLoading(false);
    };
    fetchArticles();
  }, [page]);

  return (
    <main className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-blue-900">
        Mon Blog Communication Digitale
      </h1>
      <p className="text-center mt-2 text-gray-600">
        Astuces, tendances et stratégies en communication digitale.
      </p>

      {loading ? (
        <p className="text-center mt-10 text-gray-500">Chargement...</p>
      ) : (
        <>
          {/* 📰 Liste des articles */}
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {articles.map((article: any) => (
              <div
                key={article._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4"
              >
                {article.image && (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  {article.title}
                </h2>
                <p className="text-gray-500 text-sm mb-3">{article.date}</p>
                <p className="text-gray-700 mb-4">{article.description}</p>

                {/* 🟧 Bouton “Lire l’article” */}
                <Link
                  href={`/article/${article._id}`}
                  className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
                >
                  Lire l’article
                </Link>
              </div>
            ))}
          </div>

          {/* 📄 PAGINATION */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className={`px-4 py-2 rounded-lg ${
                page === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
            Précédent
            </button>

            <span className="text-gray-700 font-medium">
              Page {page} / {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className={`px-4 py-2 rounded-lg ${
                page === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              Suivant 
            </button>
          </div>
        </>
      )}
    </main>
  );
}

