"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaBookOpen, FaRegCalendarAlt } from "react-icons/fa";

export default function HomePage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // 🔁 Charger les articles
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/articles?page=${page}&limit=3`);
        const data = await res.json();
        setArticles(data.articles);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Erreur de chargement des articles :", error);
      } finally {
        setLoading(false);
      }
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
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col justify-between"
              >
              
                <img
                  src={article.image || "/no-image.jpg"}
                  alt={article.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/no-image.jpg";
                  }}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />


                <div>
                  <h2 className="text-xl font-semibold mb-2 text-gray-800">
                    {article.title}
                  </h2>

                  <p className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                    <FaRegCalendarAlt /> {article.date}
                  </p>

                  {/* 🌐 Texte tronqué sans scrollbar */}
                  <p
                    className="text-gray-700 mb-0 h-24 overflow-hidden text-ellipsis"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {article.description}
                  </p>
                </div>

                {/* 🟧 Bouton “Lire l’article” — compact */}
                <div>
                  <Link
                    href={`/article/${article._id}`}
                    className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
                  >
                    <FaBookOpen className="text-sm mr-2" /> Lire l’article
                  </Link>
                </div>
                 
              </div>
            ))}
          </div>

          {/* 📄 PAGINATION — centrée et compacte */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition ${
                page === 1
                  ? "bg-gray-300 cursor-not-allowed text-gray-600"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              <FaArrowLeft /> Précédent
            </button>

            <span className="text-gray-700 font-medium text-sm">
              Page {page} / {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition ${
                page === totalPages
                  ? "bg-gray-300 cursor-not-allowed text-gray-600"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              Suivant <FaArrowRight />
            </button>
          </div>
        </>
      )}
    </main>
  );
}
