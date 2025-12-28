
"use client";
import { useState, ChangeEvent, FormEvent } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  // ✅ Type correct pour handleChange
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Type correct pour handleSubmit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Envoi en cours...");

    const res = await fetch("https://digicr-backend.onrender.com/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setStatus("✅ Message envoyé avec succès !");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setStatus("❌ Une erreur est survenue.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 max-w-2xl mx-auto mt-16 text-center py-8">
        <h2 className="text-4xl font-bold mb-4 text-blue-900">Contact</h2>
        <p className="text-gray-700 mb-8">
          Vous avez des questions ou des suggestions ? N’hésitez pas à me contacter
          en utilisant le formulaire ci-dessous.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 text-left mb-5">
          <div>
            <label className="block font-semibold mb-2">Nom</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full border rounded p-2 h-32"
              required
            ></textarea>
          </div>

          <button type="submit" className="bg-orange-500 text-white px-6 py-2 rounded">
            Envoyer
          </button>
        </form>

        {status && <p className="mt-4 text-sm">{status}</p>}
      </main>
    </div>
  );
}
