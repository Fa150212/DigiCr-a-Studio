"use client";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
     

      {/* Contenu principal */}
      <section className="max-w-3xl mx-auto text-center mt-20 px-6">
        <h2 className="text-4xl font-bold text-blue-900 mb-3">
          Mon Blog Communication Digitale
        </h2>
        <p className="text-gray-600 mb-12">
          Astuces, tendances et stratégies en communication digitale.
        </p>

        <div className="bg-white shadow-md rounded-2xl p-8 text-left">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">À propos</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            Bienvenue sur Mon Blog Communication Digitale, votre source en ligne
            pour des astuces, tendances et stratégies en communication digitale.
            Ici, je partage mes connaissances et expériences pour vous aider à
            exceller dans le monde numérique.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Que vous soyez professionnel du marketing, entrepreneur, ou simplement
            passionné par la communication, ce blog est fait pour vous.
          </p>

          <Link
            href="/articles"
            className="inline-block bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition"
          >
            Lire la suite
          </Link>
        </div>
      </section>

      {/* Footer
      <footer className="bg-blue-600 text-white mt-16 p-6 text-center">
        <p>Suivez-moi</p>
        <div className="flex justify-center space-x-4 mt-3 text-2xl">
          <Link href="#"><i className="fab fa-linkedin"></i></Link>
          <Link href="#"><i className="fab fa-github"></i></Link>
          <Link href="#"><i className="fas fa-envelope"></i></Link>
        </div>
        <p className="mt-4 text-sm">
          © 2025 Mon Blog Communication Digitale
        </p>
      </footer> */}
    </main>
  );
}
