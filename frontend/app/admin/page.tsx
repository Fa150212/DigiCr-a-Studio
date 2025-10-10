// // "use client";

// // import { useState } from "react";

// // export default function AdminPage() {
// //   const [formData, setFormData] = useState({
// //     title: "",
// //     date: "",
// //     description: "",
// //     image: "",
// //     content: "",
// //   });

// //   const [message, setMessage] = useState("");

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setMessage("");

// //     try {
// //       const res = await fetch("http://localhost:5000/api/articles", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(formData),
// //       });

// //       if (res.ok) {
// //         const data = await res.json();
// //         setMessage("✅ Article ajouté avec succès !");
// //         setFormData({ title: "", date: "", description: "", image: "", content: "" });
// //       } else {
// //         setMessage("❌ Erreur lors de l'ajout de l'article.");
// //       }
// //     } catch (error) {
// //       console.error(error);
// //       setMessage("⚠️ Erreur de connexion au serveur.");
// //     }
// //   };

// //   return (
// //     <main className="max-w-3xl mx-auto py-10 px-4">
// //       <h1 className="text-3xl font-bold text-center text-blue-900 mb-8">
// //         Espace Admin — Ajouter un article
// //       </h1>

// //       <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded-xl">
// //         <div>
// //           <label className="block font-semibold text-gray-700">Titre</label>
// //           <input
// //             type="text"
// //             name="title"
// //             value={formData.title}
// //             onChange={handleChange}
// //             required
// //             className="w-full border rounded-md p-2"
// //           />
// //         </div>

// //         <div>
// //           <label className="block font-semibold text-gray-700">Date</label>
// //           <input
// //             type="text"
// //             name="date"
// //             value={formData.date}
// //             onChange={handleChange}
// //             placeholder="ex: 9 octobre 2025"
// //             className="w-full border rounded-md p-2"
// //           />
// //         </div>

// //         <div>
// //           <label className="block font-semibold text-gray-700">Description courte</label>
// //           <input
// //             type="text"
// //             name="description"
// //             value={formData.description}
// //             onChange={handleChange}
// //             className="w-full border rounded-md p-2"
// //           />
// //         </div>

// //         <div>
// //           <label className="block font-semibold text-gray-700">URL de l'image</label>
// //           <input
// //             type="text"
// //             name="image"
// //             value={formData.image}
// //             onChange={handleChange}
// //             className="w-full border rounded-md p-2"
// //           />
// //         </div>

// //         <div>
// //           <label className="block font-semibold text-gray-700">Contenu</label>
// //           <textarea
// //             name="content"
// //             value={formData.content}
// //             onChange={handleChange}
// //             required
// //             rows={6}
// //             className="w-full border rounded-md p-2"
// //           />
// //         </div>

// //         <button
// //           type="submit"
// //           className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
// //         >
// //           Publier
// //         </button>
// //       </form>

// //       {message && <p className="mt-4 text-center font-semibold">{message}</p>}
// //     </main>
// //   );
// // }


// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function AdminPage() {
//   const router = useRouter();
//   const [authorized, setAuthorized] = useState(false);

//   useEffect(() => {
//     const isAuth = localStorage.getItem("adminAuth");
//     if (!isAuth) {
//       router.push("/admin/login");
//     } else {
//       setAuthorized(true);
//     }
//   }, []);

//   if (!authorized) return null; // Ne rien afficher tant qu’on vérifie

//   // ... le reste de ton formulaire ici
// }


// app/admin/page.tsx
"use client";

import { useState } from "react";

export default function AdminPage() {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: "",
    content: "",
    image: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      let imageUrl = formData.image;

      // 1️⃣ Upload de l’image vers Cloudinary via ton backend
      if (imageFile) {
        const imageData = new FormData();
        imageData.append("image", imageFile);

        const uploadRes = await fetch("http://localhost:5000/api/upload", {
          method: "POST",
          body: imageData,
        });

        const uploadData = await uploadRes.json();
        imageUrl = uploadData.imageUrl; // URL renvoyée par Cloudinary
      }

      // 2️⃣ Envoi de l’article vers ton backend
      const res = await fetch("http://localhost:5000/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, image: imageUrl }),
      });

      if (res.ok) {
        setMessage("✅ Article ajouté avec succès !");
        setFormData({ title: "", date: "", description: "", content: "", image: "" });
        setImageFile(null);
      } else {
        setMessage("❌ Erreur lors de l'ajout de l'article.");
      }
    } catch (error) {
      console.error(error);
      setMessage("⚠️ Erreur de connexion au serveur.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">🛠️ Ajouter un nouvel article</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg flex flex-col gap-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Titre"
          value={formData.title}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-3"
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-3"
        />

        <textarea
          name="description"
          placeholder="Courte description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="border border-gray-300 rounded-lg p-3"
        />

        <textarea
          name="content"
          placeholder="Contenu de l'article"
          value={formData.content}
          onChange={handleChange}
          rows={5}
          className="border border-gray-300 rounded-lg p-3"
        />

        <input type="file" accept="image/*" onChange={handleImageChange} className="p-2" />

        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700"
        >
          Publier l’article
        </button>
      </form>

      {message && <p className="mt-4 text-gray-700">{message}</p>}
    </main>
  );
}
