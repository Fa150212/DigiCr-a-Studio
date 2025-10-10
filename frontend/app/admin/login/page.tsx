"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("adminAuth", "true");
        router.push("/admin");
      } else {
        setError("Mot de passe incorrect ❌");
      }
    } catch (err) {
      setError("Erreur de connexion au serveur ⚠️");
    }
  };

  return (
    <main className="max-w-md mx-auto mt-20 bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold text-center text-blue-900 mb-6">
        Connexion Admin
      </h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="password"
          placeholder="Mot de passe admin"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded-md"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded-md hover:bg-blue-700 transition"
        >
          Se connecter
        </button>
      </form>
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
    </main>
  );
}
