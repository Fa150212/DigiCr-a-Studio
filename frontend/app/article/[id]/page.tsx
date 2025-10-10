"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);

  // 🧩 Charger l’article et les commentaires
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:5000/api/articles/${id}`);
      const data = await res.json();
      setArticle(data);

      const comRes = await fetch(`http://localhost:5000/api/comments/${id}`);
      const comData = await comRes.json();
      setComments(comData);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  // ❤️ Like
  const handleLike = async () => {
    const res = await fetch(`http://localhost:5000/api/articles/${id}/like`, { method: "POST" });
    const data = await res.json();
    setArticle({ ...article, likes: data.likes });
  };

  // 💬 Ajouter un commentaire
  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    await fetch(`http://localhost:5000/api/comments/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author, text: newComment }),
    });

    setNewComment("");
    setAuthor("");
    const res = await fetch(`http://localhost:5000/api/comments/${id}`);
    const comData = await res.json();
    setComments(comData);
  };

  if (loading) return <p className="text-center mt-10">Chargement...</p>;
  if (!article) return <p className="text-center mt-10">Article introuvable 😢</p>;

  return (
    <main className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-6">
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-72 object-cover rounded-lg mb-6"
      />
      <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
      <p className="text-gray-500 mb-4">{article.date}</p>
      <p className="text-gray-800 mb-6 whitespace-pre-line">{article.content}</p>

      {/* ❤️ Like */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={handleLike}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          ❤️ Like
        </button>
        <span className="text-lg font-semibold text-gray-700">{article.likes || 0} likes</span>
      </div>

      {/* 💬 Commentaires */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Commentaires</h2>

        <form onSubmit={handleComment} className="mb-6 flex flex-col gap-3">
          <input
            type="text"
            placeholder="Votre nom"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
          />
          <textarea
            placeholder="Écrire un commentaire..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
            className="border border-gray-300 rounded-lg p-2"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            Publier 💬
          </button>
        </form>

        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((cmt) => (
              <div key={cmt._id} className="border border-gray-200 p-3 rounded-lg">
                <p className="font-semibold">{cmt.author}</p>
                <p className="text-gray-700">{cmt.text}</p>
                <p className="text-sm text-gray-400">
                  {new Date(cmt.date).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Aucun commentaire pour le moment.</p>
          )}
        </div>
      </section>
    </main>
  );
}
