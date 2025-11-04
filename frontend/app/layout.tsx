import "./globals.css";
import { ReactNode } from "react";
import Link from "next/link";
import { FaLightbulb, FaCopyright, FaUserCircle } from "react-icons/fa";
import SessionWrapper from "./SessionWrapper";
import AuthButton from "./components/AuthButton"; // ✅ nouveau composant

export const metadata = {
  title: "DigiCréa-Studio",
  description: "Astuces et stratégies en communication digitale",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-gray-50 text-gray-900 flex flex-col min-h-screen">
        <SessionWrapper>
          {/* 🌐 HEADER STICKY */}
          <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md">
            <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
              <Link href="/" className="text-2xl font-bold text-blue-900 hover:text-blue-700 transition-colors">
                DigiCréa<span className="text-orange-500">-Studio</span>
              </Link>

              <nav className="flex space-x-6 text-blue-900 font-medium items-center">
                <Link href="/" className="relative group">
                  Accueil
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link href="/articles" className="relative group">
                  Articles
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link href="/about" className="relative group">
                  À propos
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link href="/contact" className="relative group">
                  Contact
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
                </Link>

                {/* ✅ Bouton d'authentification */}
                <AuthButton />
              </nav>
            </div>
          </header>

          {/* 🧩 CONTENU DES PAGES */}
          <main className="flex-1 max-w-7xl mx-auto w-full p-0">{children}</main>

          {/* 🌈 FOOTER MODERNE */}
          <footer className="bg-blue-600 text-white py-6 mt-0 shadow-inner">
            <div className="max-w-6xl mx-auto text-center space-y-2 flex flex-col items-center">
              <div className="flex items-center space-x-2">
                <FaLightbulb className="w-5 h-5 text-yellow-300" />
                <p className="text-lg font-semibold flex items-center">
                  DigiCréa-Studio
                </p>
              </div>
              <p className="text-sm opacity-80 flex items-center gap-2">
                <FaLightbulb className="w-4 h-4" />
                Astuces, tendances et stratégies en communication digitale.
              </p>
              <p className="text-sm opacity-70 flex items-center gap-2">
                <FaCopyright className="w-4 h-4" />
                {new Date().getFullYear()} DigiCréa-Studio. Tous droits réservés.
              </p>
            </div>
          </footer>
        </SessionWrapper>
      </body>
    </html>
  );
}


// import "./globals.css";
// import { ReactNode } from "react";
// import Link from "next/link";
// import { FaLightbulb, FaCopyright } from "react-icons/fa";
// import SessionWrapper from "./SessionWrapper"; // ✅ import du wrapper

// export const metadata = {
//   title: "DigiCréa-Studio",
//   description: "Astuces et stratégies en communication digitale",
// };

// export default function RootLayout({ children }: { children: ReactNode }) {
//   return (
//     <html lang="fr">
//       <body className="bg-gray-50 text-gray-900 flex flex-col min-h-screen">
//         {/* ✅ Fournit la session à toute l’app */}
//         <SessionWrapper>
//           {/* 🌐 HEADER STICKY */}
//           <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md">
//             <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
//               <h1 className="text-2xl font-bold text-blue-900 hover:text-blue-700 transition-colors">
//                 DigiCréa<span className="text-orange-500">-Studio</span>
//               </h1>

//               <nav className="flex space-x-6 text-blue-900 font-medium">
//                 <Link href="/" className="relative group">
//                   Accueil
//                   <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
//                 </Link>
//                 <Link href="/articles" className="relative group">
//                   Articles
//                   <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
//                 </Link>
//                 <Link href="/about" className="relative group">
//                   À propos
//                   <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
//                 </Link>
//                 <Link href="/contact" className="relative group">
//                   Contact
//                   <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
//                 </Link>
//               </nav>
//             </div>
//           </header>

//           {/* 🧩 CONTENU DES PAGES */}
//           <main className="flex-1 max-w-7xl mx-auto w-full p-0">{children}</main>

//           {/* 🌈 FOOTER MODERNE */}
//           <footer className="bg-blue-600 text-white py-6 mt-0 shadow-inner">
//             <div className="max-w-6xl mx-auto text-center space-y-2 flex flex-col items-center">
//               <div className="flex items-center space-x-2">
//                 <FaLightbulb className="w-5 h-5 text-yellow-300" />
//                 <p className="text-lg font-semibold flex items-center">
//                   DigiCréa-Studio
//                 </p>
//               </div>
//               <p className="text-sm opacity-80 flex items-center gap-2">
//                 <FaLightbulb className="w-4 h-4" />
//                 Astuces, tendances et stratégies en communication digitale.
//               </p>
//               <p className="text-sm opacity-70 flex items-center gap-2">
//                 <FaCopyright className="w-4 h-4" />
//                 {new Date().getFullYear()} DigiCréa-Studio. Tous droits réservés.
//               </p>
//             </div>
//           </footer>
//         </SessionWrapper>
//       </body>
//     </html>
//   );
// }


// // import "./globals.css"
// // import { ReactNode } from "react"
// // import Link from "next/link"
// // import { FaLightbulb, FaCopyright } from "react-icons/fa";



// // export const metadata = {
// //   title: "DigiCréa-Studio",
// //   description: "Astuces et stratégies en communication digitale",
// // }

// // export default function RootLayout({ children }: { children: ReactNode }) {
// //   return (
// //     <html lang="fr">
// //       <body className="bg-gray-50 text-gray-900 flex flex-col min-h-screen">

// //         {/* 🌐 HEADER STICKY */}
// //         <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md">
// //           <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
// //             <h1 className="text-2xl font-bold text-blue-900 hover:text-blue-700 transition-colors">
// //               DigiCréa<span className="text-orange-500">-Studio</span>
// //             </h1>

// //             <nav className="flex space-x-6 text-blue-900 font-medium">
// //               <Link href="/" className="relative group">
// //                 Accueil
// //                 <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
// //               </Link>
// //               <Link href="/articles" className="relative group">
// //                 Articles
// //                 <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
// //               </Link>
// //               <Link href="/about" className="relative group">
// //                 À propos
// //                 <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
// //               </Link>
// //               <Link href="/contact" className="relative group">
// //                 Contact
// //                 <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
// //               </Link>
// //             </nav>
// //           </div>
// //         </header>

// //         {/* 🧩 CONTENU DES PAGES */}
// //         <main className="flex-1 max-w-7xl mx-auto w-full p-0">
// //           {children}
// //         </main>

// //         {/* 🌈 FOOTER MODERNE */}
        
// //         <footer className="bg-blue-600 text-white py-6 mt-0 shadow-inner">
// //           <div className="max-w-6xl mx-auto text-center space-y-2 flex flex-col items-center">
// //             <div className="flex items-center space-x-2">
// //               <FaLightbulb className="w-5 h-5 text-yellow-300" />
// //               <p className="text-lg font-semibold flex items-center">
// //                 DigiCréa-Studio
// //               </p>
// //             </div>
// //             <p className="text-sm opacity-80 flex items-center gap-2">
// //               <FaLightbulb className="w-4 h-4" />
// //               Astuces, tendances et stratégies en communication digitale.
// //             </p>
// //             <p className="text-sm opacity-70 flex items-center gap-2">
// //               <FaCopyright className="w-4 h-4" />
// //               {new Date().getFullYear()} DigiCréa-Studio. Tous droits réservés.
// //             </p>
// //           </div>
// //         </footer>

// //       </body>
// //     </html>
// //   )
// // }
