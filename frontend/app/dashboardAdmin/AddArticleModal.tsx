"use client";

import { useState } from "react";

export default function AddArticleModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: "",
    content: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e: any) => {
    if (e.target.files?.[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMessage("");

    try {
      let imageUrl = "";

      // 🔼 Upload image (ADMIN COOKIE OBLIGATOIRE)
      if (imageFile) {
        const fd = new FormData();
        fd.append("image", imageFile);

        const uploadRes = await fetch(
          `${process.env.NEXT_PUBLIC_API}/api/upload`,
          {
            method: "POST",
            credentials: "include", // ✅ OBLIGATOIRE
            body: fd,
          }
        );

        if (!uploadRes.ok) throw new Error("Upload failed");

        const uploadData = await uploadRes.json();
        imageUrl = uploadData.imageUrl;
      }

      // 📝 Création article (ADMIN COOKIE OBLIGATOIRE)
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/articles`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // ✅ OBLIGATOIRE
          body: JSON.stringify({ ...formData, image: imageUrl }),
        }
      );

      if (!res.ok) throw new Error("Create failed");

      setMessage("✅ Article ajouté avec succès");
      onClose();
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Erreur serveur");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl w-full max-w-xl"
      >
        <h2 className="text-xl font-bold mb-4">Ajouter un article</h2>

        <input
          name="title"
          onChange={handleChange}
          placeholder="Titre"
          className="border p-2 w-full mb-2"
          required
        />

        <input
          name="date"
          type="date"
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          required
        />

        <textarea
          name="description"
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 w-full mb-2"
        />

        <textarea
          name="content"
          onChange={handleChange}
          placeholder="Contenu"
          className="border p-2 w-full mb-2"
          required
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <div className="flex gap-3 mt-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Publier
          </button>
          <button
            type="button"
            onClick={onClose}
            className="border px-4 py-2 rounded"
          >
            Annuler
          </button>
        </div>

        {message && <p className="mt-2 text-sm">{message}</p>}
      </form>
    </div>
  );
}
