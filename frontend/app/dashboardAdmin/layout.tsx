"use client";

import Sidebar from "./components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />

      {/* CONTENU */}
      <main className="ml-64 min-h-screen p-8">
        {children}
      </main>
    </div>
  );
}
