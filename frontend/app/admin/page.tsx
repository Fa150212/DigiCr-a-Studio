
// // app/admin/page.tsx
// "use client";

// import { useState } from "react";

// export default function AdminPage() {
//   const [formData, setFormData] = useState({
//     title: "",
//     date: "",
//     description: "",
//     content: "",
//     image: "",
//   });

//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [message, setMessage] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setImageFile(e.target.files[0]);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setMessage("");

//     try {
//       let imageUrl = formData.image;

//       // 1️⃣ Upload de l’image vers Cloudinary via ton backend
//       if (imageFile) {
//         const imageData = new FormData();
//         imageData.append("image", imageFile);

//         const uploadRes = await fetch("http://localhost:5000/api/upload", {
//           method: "POST",
//           body: imageData,
//         });

//         const uploadData = await uploadRes.json();
//         imageUrl = uploadData.imageUrl; // URL renvoyée par Cloudinary
//       }

//       // 2️⃣ Envoi de l’article vers ton backend
//       const res = await fetch("http://localhost:5000/api/articles", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...formData, image: imageUrl }),
//       });

//       if (res.ok) {
//         setMessage("✅ Article ajouté avec succès !");
//         setFormData({ title: "", date: "", description: "", content: "", image: "" });
//         setImageFile(null);
//       } else {
//         setMessage("❌ Erreur lors de l'ajout de l'article.");
//       }
//     } catch (error) {
//       console.error(error);
//       setMessage("⚠️ Erreur de connexion au serveur.");
//     }
//   };

//   return (
//     <main className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">🛠️ Ajouter un nouvel article</h1>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg flex flex-col gap-4"
//       >
//         <input
//           type="text"
//           name="title"
//           placeholder="Titre"
//           value={formData.title}
//           onChange={handleChange}
//           required
//           className="border border-gray-300 rounded-lg p-3"
//         />

//         <input
//           type="date"
//           name="date"
//           value={formData.date}
//           onChange={handleChange}
//           required
//           className="border border-gray-300 rounded-lg p-3"
//         />

//         <textarea
//           name="description"
//           placeholder="Courte description"
//           value={formData.description}
//           onChange={handleChange}
//           rows={3}
//           className="border border-gray-300 rounded-lg p-3"
//         />

//         <textarea
//           name="content"
//           placeholder="Contenu de l'article"
//           value={formData.content}
//           onChange={handleChange}
//           rows={5}
//           className="border border-gray-300 rounded-lg p-3"
//         />

//         <input type="file" accept="image/*" onChange={handleImageChange} className="p-2" />

//         <button
//           type="submit"
//           className="bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700"
//         >
//           Publier l’article
//         </button>
//       </form>

//       {message && <p className="mt-4 text-gray-700">{message}</p>}
//     </main>
//   );
// }
