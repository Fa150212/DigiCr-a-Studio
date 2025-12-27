
"use client";

import { useEffect, useState } from "react";
import ArticleTable from "../components/ArticleTable";
import DeleteModal from "../components/DeleteModal";
import EditArticleModal from "../components/EditArticleModal";
import PreviewArticleModal from "../components/PreviewArticleModal";

const ITEMS_PER_PAGE = 5;

export default function ArticlesPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API}/api/articles`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        setArticles(Array.isArray(data) ? data : data.articles || []);
      });
  }, []);

  /* 🔍 Recherche */
  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(search.toLowerCase())
  );

  /* 📄 Pagination */
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedArticles = filteredArticles.slice(
    start,
    start + ITEMS_PER_PAGE
  );

  /* ACTIONS */
  const handleDelete = (article: any) => {
    setSelected(article);
    setShowDelete(true);
  };

  const confirmDelete = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/articles/${selected._id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    setArticles(prev =>
      prev.filter(a => a._id !== selected._id)
    );

    setShowDelete(false);
  };

  const handleEdit = (article: any) => {
    setSelected(article);
    setShowEdit(true);
  };

  const handleSaveEdit = (updated: any) => {
    setArticles(prev =>
      prev.map(a => (a._id === updated._id ? updated : a))
    );
    setShowEdit(false);
  };

  const handlePreview = (article: any) => {
    setSelected(article);
    setShowPreview(true);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Articles</h1>

      {/* 🔍 Recherche */}
      <input
        type="text"
        placeholder="Rechercher un article..."
        value={search}
        onChange={e => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        className="w-full md:w-1/3 border p-2 rounded-lg"
      />

      <ArticleTable
        articles={paginatedArticles}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onPreview={handlePreview}
      />

      {/* 📄 Pagination */}
      <div className="flex justify-center gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {showDelete && (
        <DeleteModal
          article={selected}
          onClose={() => setShowDelete(false)}
          onConfirm={confirmDelete}
        />
      )}

      {showEdit && (
        <EditArticleModal
          article={selected}
          onClose={() => setShowEdit(false)}
          onSave={handleSaveEdit}
        />
      )}

      {showPreview && (
        <PreviewArticleModal
          article={selected}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}
