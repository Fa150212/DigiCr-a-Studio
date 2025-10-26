"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaCheckCircle, FaHome, FaEnvelope } from "react-icons/fa";

export default function MerciPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center px-6 py-16">
      {/* ✅ Icône de confirmation */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="mb-6"
      >
        <FaCheckCircle className="text-green-500 text-6xl" />
      </motion.div>

      {/* 🎉 Titre principal */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-blue-900 mb-4 text-center"
      >
        Merci pour votre message !
      </motion.h1>

      {/* 📝 Message complémentaire */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-gray-600 text-center max-w-xl mb-10"
      >
        Votre message a bien été envoyé. Je vous répondrai dès que possible.  
        En attendant, vous pouvez explorer mes derniers articles ou retourner à l’accueil.
      </motion.p>

      {/* 🔗 Boutons d’action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="flex gap-4"
      >
        <Link
          href="/"
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <FaHome /> Retour à l’accueil
        </Link>

        <Link
          href="/contact"
          className="flex items-center gap-2 bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition"
        >
          <FaEnvelope /> Me recontacter
        </Link>
      </motion.div>
    </main>
  );
}
