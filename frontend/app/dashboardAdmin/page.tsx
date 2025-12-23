"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FiPlus,
  FiFileText,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";
import AddArticleModal from "./AddArticleModal";

export default function DashboardAdminPage() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API}/api/admin/check`,
          { credentials: "include" }
        );

        if (!res.ok) return router.push("/login");

        const data = await res.json();
        if (!data.admin) router.push("/login");
        else setLoading(false);
      } catch {
        router.push("/login");
      }
    };

    checkAdmin();
  }, [router]);

  /* 🔄 Loader */
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="h-12 w-12 rounded-full border-4 border-blue-600 border-t-transparent mb-4"
        />
        <p className="text-gray-500">Chargement du dashboard admin...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 py-8">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Dashboard Admin
          </h1>
          <p className="text-gray-500 mt-1">
            Gérez les articles et le contenu du site
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition shadow"
        >
          <FiPlus size={20} />
          Ajouter un article
        </motion.button>
      </motion.div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<FiFileText size={22} />}
          label="Articles publiés"
          value="—"
        />

        <StatCard
          icon={<FiClock size={22} />}
          label="Dernière publication"
          value="—"
        />

        <StatCard
          icon={<FiCheckCircle size={22} />}
          label="Statut"
          value="Admin connecté"
          valueColor="text-green-600"
        />
      </div>

      {/* MODAL */}
      {open && <AddArticleModal onClose={() => setOpen(false)} />}
    </div>
  );
}

/* 🔹 STAT CARD COMPONENT */
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition"
    >
      <div className="flex items-center gap-3 text-blue-600 mb-3">
        {icon}
        <p className="text-sm font-medium text-gray-500">{label}</p>
      </div>

      <h3 className={`text-2xl font-bold ${valueColor}`}>
        {value}
      </h3>
    </motion.div>
  );
}

