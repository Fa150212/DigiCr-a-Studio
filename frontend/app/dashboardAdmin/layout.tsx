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


// "use client";

// import Sidebar from "./components/Sidebar";

// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="flex min-h-screen">
//       <Sidebar />
//       <main className="flex-1 p-8 bg-gray-100">{children}</main>
//     </div>
//   );
// }


// // "use client";

// // import Link from "next/link";
// // import { ReactNode } from "react";
// // import { FaPlus, FaTachometerAlt } from "react-icons/fa";

// // export default function DashboardLayout({ children }: { children: ReactNode }) {
// //   return (
// //     <div className="flex min-h-screen">
// //       <aside className="w-64 bg-white border-r p-6">
// //         <h2 className="text-xl font-bold text-blue-700 mb-6">Admin Dashboard</h2>
// //         <nav className="flex flex-col gap-3">
// //           <Link href="/admin/dashboard" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
// //             <FaTachometerAlt /> Dashboard
// //           </Link>
// //           {/* <button
// //             onClick={() => {
// //               const evt = new CustomEvent("openAddArticleModal");
// //               window.dispatchEvent(evt);
// //             }}
// //             className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded text-left"
// //           >
// //             <FaPlus /> Ajouter un article
// //           </button> */}
// //         </nav>
// //       </aside>

// //       <main className="flex-1 p-8 bg-gray-50">{children}</main>
// //     </div>
// //   );
// // }
