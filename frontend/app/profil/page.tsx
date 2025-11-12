"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaTwitter, FaLinkedin, FaCrown, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ProfilPage() {
  const { data: session } = useSession();
  const user = session?.user as any;
  const router = useRouter();

  const [form, setForm] = useState({
    bio: "",
    twitter: "",
    linkedin: "",
  });
  const [loading, setLoading] = useState(false);

  // 🔹 Charger les infos utilisateur
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/api/users/by-email/${user.email}`)
        .then((res) => res.json())
        .then((data) =>
          setForm({
            bio: data.bio || "",
            twitter: data.twitter || "",
            linkedin: data.linkedin || "",
          })
        )
        .catch((err) => console.error("Erreur récupération user:", err));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!user?._id) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/users/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) alert("✅ Profil mis à jour avec succès !");
    } catch (err) {
      console.error("Erreur update profil:", err);
    }
    setLoading(false);
  };

  const handleCancel = () => router.back(); // 🔙 Retour page précédente

  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen text-center">
        <p className="text-gray-600 text-lg">Veuillez vous connecter pour voir votre profil</p>
      </div>
    );
  }

  return (
    <div className="relative max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg sm:p-8">
      {/* 🔙 Bouton retour */}
      <button
        onClick={handleCancel}
        className="absolute top-4 left-4 flex items-center gap-1 text-gray-600 hover:text-gray-800 transition"
        title="Retour"
      >
        <FaArrowLeft className="text-lg sm:text-xl" />
        <span className="hidden sm:inline text-sm font-medium">Retour</span>
      </button>

      {/* 🧑 Profil utilisateur */}
      <div className="flex flex-col items-center text-center mt-4">
        {user.image && (
          <Image
            src={user.image}
            alt="Photo de profil"
            width={100}
            height={100}
            className="rounded-full border-2 border-gray-300"
          />
        )}

        <h2 className="text-2xl font-semibold mt-4">{user.name}</h2>
        <p className="text-gray-500 text-sm">{user.email}</p>

        {/* 👑 Statut Premium */}
        <div className="mt-4 flex flex-col items-center">
          {user.isPremium ? (
            <motion.div
              className="flex items-center gap-2 text-yellow-500 font-semibold bg-yellow-50 px-4 py-2 rounded-full shadow-sm"
              whileHover={{ scale: 1.05 }}
            >
              <FaCrown className="text-yellow-400" />
              <span>Membre Premium</span>
            </motion.div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-2 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all"
              onClick={() => alert("✨ Bientôt disponible !")}
            >
              <FaCrown />
              Devenir Premium
            </motion.button>
          )}
        </div>
      </div>

      {/* 📝 Formulaire profil */}
      <div className="mt-8 space-y-4 w-full">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Bio</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-yellow-400"
            placeholder="Parle un peu de toi..."
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Twitter</label>
            <div className="flex items-center gap-2 border rounded-lg p-2">
              <FaTwitter className="text-sky-500" />
              <input
                name="twitter"
                value={form.twitter}
                onChange={handleChange}
                placeholder="@tonpseudo"
                className="flex-1 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">LinkedIn</label>
            <div className="flex items-center gap-2 border rounded-lg p-2">
              <FaLinkedin className="text-blue-600" />
              <input
                name="linkedin"
                value={form.linkedin}
                onChange={handleChange}
                placeholder="ton-url-linkedin"
                className="flex-1 outline-none"
              />
            </div>
          </div>
        </div>

        {/* ✅ Boutons d’action */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            disabled={loading}
            className="flex-1 bg-yellow-500 text-white font-semibold py-3 rounded-lg hover:bg-yellow-600 transition-all disabled:opacity-50"
          >
            {loading ? "Sauvegarde..." : "Enregistrer les modifications"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCancel}
            className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-300 transition-all"
          >
            Annuler
          </motion.button>
        </div>
      </div>
    </div>
  );
}
