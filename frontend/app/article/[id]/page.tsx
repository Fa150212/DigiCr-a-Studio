"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ArticlePage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const [article, setArticle] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  // 🧩 Charger article et commentaires
  useEffect(() => {
    const fetchData = async () => {
      const articleRes = await fetch(`http://localhost:5000/api/articles/${id}`);
      const articleData = await articleRes.json();
      setArticle(articleData);

      const commentRes = await fetch(`http://localhost:5000/api/comments/${id}`);
      const commentData = await commentRes.json();
      setComments(commentData);

      setLoading(false);
    };
    fetchData();
  }, [id]);

  // ❤️ Like article
  const handleLike = async () => {
    const res = await fetch(`http://localhost:5000/api/articles/${id}/like`, { method: "POST" });
    const data = await res.json();
    setArticle({ ...article, likes: data.likes });
  };

  // 💬 Ajouter un commentaire
  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return alert("Connecte-toi pour commenter !");
    if (!newComment.trim()) return;

    await fetch(`http://localhost:5000/api/comments/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author: session.user.name, text: newComment }),
    });

    setNewComment("");
    refreshComments();
  };

  // 🪄 Répondre à un commentaire
  const handleReply = async (commentId: string) => {
    if (!session) return alert("Connecte-toi pour répondre !");
    if (!replyText.trim()) return;

    await fetch(`http://localhost:5000/api/comments/${commentId}/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author: session.user.name, text: replyText }),
    });

    setReplyText("");
    setReplyingTo(null);
    refreshComments();
  };

  // 😍 Réagir avec un émoji
  const handleReact = async (commentId: string, emoji: string) => {
    await fetch(`http://localhost:5000/api/comments/${commentId}/react`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emoji }),
    });

    refreshComments();
  };

  // 🔁 Recharger les commentaires
  const refreshComments = async () => {
    const res = await fetch(`http://localhost:5000/api/comments/${id}`);
    const data = await res.json();
    setComments(data);
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

        {!session ? (
          <button
            onClick={() => signIn("google")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg mb-4"
          >
            Se connecter pour commenter
          </button>
        ) : (
          <form onSubmit={handleComment} className="mb-6 flex flex-col gap-3">
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
        )}

        {/* 🔽 Liste des commentaires */}
        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((cmt) => (
              <div key={cmt._id} className="border border-gray-200 p-3 rounded-lg">
                <p className="font-semibold text-blue-700">{cmt.author}</p>
                <p className="text-gray-700">{cmt.text}</p>
                <p className="text-sm text-gray-400">
                  {new Date(cmt.date).toLocaleDateString()}
                </p>

                {/* 🧡 Réactions */}
                <div className="flex gap-3 mt-2">
                  {["❤️", "🔥", "👍", "😂"].map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => handleReact(cmt._id, emoji)}
                      className="text-lg"
                    >
                      {emoji} {cmt.reactions?.[emoji] || 0}
                    </button>
                  ))}
                </div>

                {/* 💬 Bouton Répondre */}
                {session && (
                  <button
                    onClick={() =>
                      setReplyingTo(replyingTo === cmt._id ? null : cmt._id)
                    }
                    className="text-blue-600 text-sm mt-2"
                  >
                    {replyingTo === cmt._id ? "Annuler" : "Répondre"}
                  </button>
                )}

                {/* 📝 Formulaire de réponse */}
                {replyingTo === cmt._id && (
                  <div className="mt-3">
                    <textarea
                      placeholder="Votre réponse..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      rows={2}
                      className="border border-gray-300 rounded-lg p-2 w-full"
                    />
                    <button
                      onClick={() => handleReply(cmt._id)}
                      className="mt-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Répondre 💬
                    </button>
                  </div>
                )}

                {/* 🔁 Affichage des réponses */}
                {cmt.replies?.length > 0 && (
                  <div className="mt-3 ml-4 border-l-2 border-gray-200 pl-3 space-y-2">
                    {cmt.replies.map((rep: any, i: number) => (
                      <div key={i} className="text-sm">
                        <p className="font-semibold text-green-700">{rep.author}</p>
                        <p className="text-gray-700">{rep.text}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(rep.date).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
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

