"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  FiHome,
  FiFileText,
  FiSettings,
  FiLogOut,
  FiUser,
} from "react-icons/fi";

export default function Sidebar() {
  const [admin, setAdmin] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API}/api/admin/check`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setAdmin(data.admin))
      .catch(() => setAdmin(null));
  }, []);

  const logout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API}/api/admin/logout`, {
      method: "POST",
      credentials: "include",
    });
    window.location.href = "/login";
  };

  const linkClass = (path: string) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium
     ${
       pathname === path
         ? "bg-blue-600 text-white shadow"
         : "text-gray-700 hover:bg-gray-100"
     }`;

  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 h-screen w-64 bg-white border-r shadow-sm flex flex-col justify-between z-40"
    >
      {/* TOP */}
      <div className="p-6">
        {/* LOGO */}
        <h2 className="text-2xl font-bold text-blue-600 mb-10">
          DigiCréa Admin
        </h2>

        {/* PROFIL ADMIN */}
        {admin && (
          <div className="flex items-center gap-3 mb-8 bg-gray-50 p-4 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
              <FiUser size={18} />
            </div>

            <div>
              <p className="font-semibold text-gray-800 leading-none">
                {admin.name}
              </p>
              <p className="text-xs text-gray-500">
                {admin.role || "Administrateur"}
              </p>
            </div>
          </div>
        )}

        {/* NAVIGATION */}
        <nav className="flex flex-col gap-2">
          <Link href="/dashboardAdmin" className={linkClass("/dashboardAdmin")}>
            <FiHome size={18} />
            Dashboard
          </Link>

          <Link
            href="/dashboardAdmin/articles"
            className={linkClass("/dashboardAdmin/articles")}
          >
            <FiFileText size={18} />
            Articles
          </Link>

          <Link
            href="/dashboardAdmin/settings"
            className={linkClass("/dashboardAdmin/settings")}
          >
            <FiSettings size={18} />
            Paramètres
          </Link>
        </nav>
      </div>

      {/* BOTTOM */}
      <div className="p-6 border-t">
        <button
          onClick={logout}
          className="flex items-center gap-3 text-red-600 hover:bg-red-50 w-full px-4 py-3 rounded-xl transition font-medium"
        >
          <FiLogOut size={18} />
          Déconnexion
        </button>
      </div>
    </motion.aside>
  );
}


// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { motion } from "framer-motion";

// export default function Sidebar() {
//   const [admin, setAdmin] = useState<any>(null);
//   const pathname = usePathname();

//   useEffect(() => {
//     fetch(`${process.env.NEXT_PUBLIC_API}/api/admin/check`, {
//       credentials: "include",
//     })
//       .then(res => res.json())
//       .then(data => setAdmin(data.admin))
//       .catch(() => setAdmin(null));
//   }, []);

//   const logout = async () => {
//     await fetch(`${process.env.NEXT_PUBLIC_API}/api/admin/logout`, {
//       method: "POST",
//       credentials: "include",
//     });
//     window.location.href = "/login";
//   };

//   const linkClass = (path: string) =>
//     `flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium
//      ${pathname === path
//         ? "bg-blue-600 text-white shadow"
//         : "text-gray-700 hover:bg-gray-100"
//      }`;

//   return (
//     <motion.aside
//       initial={{ x: -80, opacity: 0 }}
//       animate={{ x: 0, opacity: 1 }}
//       transition={{ duration: 0.4 }}
//       className="fixed top-0 left-0 h-screen w-64 bg-white border-r shadow-sm flex flex-col justify-between z-40"
//     >
//       {/* TOP */}
//       <div className="p-6">
//         <h2 className="text-2xl font-bold text-blue-600 mb-8">
//           DigiCréa Admin
//         </h2>

//         {admin && (
//           <div className="mb-6 bg-gray-50 p-4 rounded-xl">
//             <p className="font-semibold text-gray-800">{admin.name}</p>
//             <p className="text-sm text-gray-500">
//               {admin.role || "Administrateur"}
//             </p>
//           </div>
//         )}

//         <nav className="flex flex-col gap-2">
//           <Link href="/dashboardAdmin" className={linkClass("/dashboardAdmin")}>
//             📊 Dashboard
//           </Link>

//           <Link href="/dashboardAdmin/articles" className={linkClass("/dashboardAdmin/articles")}>
//             📝 Articles
//           </Link>

//           <Link href="/dashboardAdmin/settings" className={linkClass("/dashboardAdmin/settings")}>
//             ⚙️ Paramètres
//           </Link>
//         </nav>
//       </div>

//       {/* BOTTOM */}
//       <div className="p-6 border-t">
//         <button
//           onClick={logout}
//           className="flex items-center gap-3 text-red-600 hover:bg-red-50 w-full px-4 py-3 rounded-xl transition"
//         >
//           🚪 Déconnexion
//         </button>
//       </div>
//     </motion.aside>
//   );
// }
