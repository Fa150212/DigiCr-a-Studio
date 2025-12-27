
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FiPlus,
  FiFileText,
  FiClock,
  FiCheckCircle,
  FiHeart,
  FiEye,
} from "react-icons/fi";

import AddArticleModal from "./AddArticleModal";
import ArticlesChart from "./components/ArticlesChart";

export default function DashboardAdminPage() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [articles, setArticles] = useState<any[]>([]);
  const [totalArticles, setTotalArticles] = useState(0);

  /* 🔐 Vérification admin */
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API}/api/admin/check`,
          { credentials: "include" }
        );

        if (!res.ok) return router.push("/login");

        const data = await res.json();
        if (!data.admin) return router.push("/login");

        setLoading(false);
      } catch {
        router.push("/login");
      }
    };

    checkAdmin();
  }, [router]);

  /* 📰 Charger TOUS les articles (stats réelles) */
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API}/api/articles?limit=1000`,
          { credentials: "include" }
        );

        const data = await res.json();

        setArticles(data.articles || []);
        setTotalArticles(data.total || 0);
      } catch (error) {
        console.error("Erreur chargement articles", error);
      }
    };

    fetchArticles();
  }, []);

  /* 🔄 Loader */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="h-12 w-12 rounded-full border-4 border-blue-600 border-t-transparent"
        />
      </div>
    );
  }

  /* 📊 STATS DYNAMIQUES */

  const totalLikes = articles.reduce(
    (sum, a) => sum + (a.likes || 0),
    0
  );

  const totalViews = articles.reduce(
    (sum, a) => sum + (a.views || 0),
    0
  );

  const lastDate =
    articles.length > 0
      ? new Date(
          Math.max(
            ...articles.map((a) =>
              new Date(a.date || a.createdAt).getTime()
            )
          )
        ).toLocaleDateString("fr-FR")
      : "—";

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow p-6 flex justify-between items-center mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Dashboard Admin
          </h1>
          <p className="text-gray-500">
            Statistiques et gestion du blog
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
        >
          <FiPlus />
          Nouvel article
        </button>
      </motion.div>

      {/* 📊 STATS */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-10">
        <StatCard
          icon={<FiFileText />}
          label="Articles"
          value={totalArticles.toString()}
        />

        <StatCard
          icon={<FiHeart />}
          label="Likes"
          value={totalLikes.toString()}
          valueColor="text-red-600"
        />

        <StatCard
          icon={<FiEye />}
          label="Vues"
          value={totalViews.toString()}
          valueColor="text-blue-600"
        />

        <StatCard
          icon={<FiClock />}
          label="Dernière publication"
          value={lastDate}
        />

        <StatCard
          icon={<FiCheckCircle />}
          label="Statut"
          value="Admin connecté"
          valueColor="text-green-600"
        />
      </div>

      {/* 📈 ANALYTICS */}
      <ArticlesChart articles={articles} />

      {/* MODAL */}
      {open && <AddArticleModal onClose={() => setOpen(false)} />}
    </div>
  );
}

/* 🔹 STAT CARD */
function StatCard({
  icon,
  label,
  value,
  valueColor = "text-gray-800",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl p-6 shadow"
    >
      <div className="flex items-center gap-3 text-blue-600 mb-2">
        {icon}
        <span className="text-sm text-gray-500">{label}</span>
      </div>

      <h3 className={`text-2xl font-bold ${valueColor}`}>
        {value}
      </h3>
    </motion.div>
  );
}
