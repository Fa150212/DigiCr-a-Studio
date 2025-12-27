import "./globals.css";
import { ReactNode } from "react";
import { FaLightbulb, FaCopyright } from "react-icons/fa";
import SessionWrapper from "./SessionWrapper";
import Header from "./components/Header"; // ✅ Import du Header client

export const metadata = {
  title: "DigiCréa-Studio",
  description: "Blog de communication digitale, marketing et stratégie web",
  keywords: ["blog", "marketing", "digital", "seo", "communication"],
  authors: [{ name: "Ton Nom" }],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-gray-50 text-gray-900 flex flex-col min-h-screen">
        <SessionWrapper>
          <Header />

          <main className="flex-1 max-w-7xl mx-auto w-full p-0">
            {children}
          </main>

          <footer className="bg-blue-600 text-white py-8 mt-10 shadow-inner">
            <div className="max-w-6xl mx-auto text-center px-4 space-y-3 flex flex-col items-center">
              <div className="flex items-center space-x-2">
                <FaLightbulb className="w-5 h-5 text-yellow-300" />
                <p className="text-lg sm:text-xl font-semibold">DigiCréa-Studio</p>
              </div>
              <p className="text-sm sm:text-base opacity-80 flex items-center gap-2 text-center max-w-lg">
                <FaLightbulb className="w-4 h-4" />
                Astuces, tendances et stratégies en communication digitale.
              </p>
              <p className="text-xs sm:text-sm opacity-70 flex items-center gap-2">
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
// import { ReactNode, useState } from "react";
// import Link from "next/link";
// import { FaLightbulb, FaCopyright, FaBars, FaTimes } from "react-icons/fa";
// import SessionWrapper from "./SessionWrapper";
// import AuthButton from "./components/AuthButton";

// export const metadata = {
//   title: "DigiCréa-Studio",
//   description: "Astuces et stratégies en communication digitale",
// };

// export default function RootLayout({ children }: { children: ReactNode }) {
//   return (
//     <html lang="fr">
//       <body className="bg-gray-50 text-gray-900 flex flex-col min-h-screen">
//         <SessionWrapper>
//           <Header />
//           <main className="flex-1 max-w-7xl mx-auto w-full p-0">{children}</main>
//           <Footer />
//         </SessionWrapper>
//       </body>
//     </html>
//   );
// }

// /* 🌐 HEADER RESPONSIVE */
// function Header() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
//       <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
//         {/* 🔹 LOGO */}
//         <Link
//           href="/"
//           className="text-2xl font-bold text-blue-900 hover:text-blue-700 transition-colors"
//         >
//           DigiCréa<span className="text-orange-500">-Studio</span>
//         </Link>

//         {/* 🔹 MENU DESKTOP */}
//         <nav className="hidden md:flex space-x-6 text-blue-900 font-medium items-center">
//           <NavLink href="/">Accueil</NavLink>
//           <NavLink href="/articles">Articles</NavLink>
//           <NavLink href="/about">À propos</NavLink>
//           <NavLink href="/contact">Contact</NavLink>
//           <AuthButton />
//         </nav>

//         {/* 🔹 BOUTON BURGER MOBILE */}
//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="md:hidden text-blue-900 text-2xl focus:outline-none"
//           aria-label="Menu"
//         >
//           {menuOpen ? <FaTimes /> : <FaBars />}
//         </button>
//       </div>

//       {/* 🔹 MENU MOBILE */}
//       {menuOpen && (
//         <div className="md:hidden bg-white border-t border-gray-200 flex flex-col items-center py-4 space-y-4 animate-slideDown">
//           <NavLink href="/" onClick={() => setMenuOpen(false)}>
//             Accueil
//           </NavLink>
//           <NavLink href="/articles" onClick={() => setMenuOpen(false)}>
//             Articles
//           </NavLink>
//           <NavLink href="/about" onClick={() => setMenuOpen(false)}>
//             À propos
//           </NavLink>
//           <NavLink href="/contact" onClick={() => setMenuOpen(false)}>
//             Contact
//           </NavLink>
//           <AuthButton />
//         </div>
//       )}
//     </header>
//   );
// }

// /* 🔹 COMPOSANT NAVLINK (avec surlignage hover élégant) */
// function NavLink({
//   href,
//   children,
//   onClick,
// }: {
//   href: string;
//   children: React.ReactNode;
//   onClick?: () => void;
// }) {
//   return (
//     <Link
//       href={href}
//       onClick={onClick}
//       className="relative group text-lg sm:text-base"
//     >
//       {children}
//       <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
//     </Link>
//   );
// }

// /* 🌈 FOOTER MODERNE ET RESPONSIVE */
// function Footer() {
//   return (
//     <footer className="bg-blue-600 text-white py-8 mt-10 shadow-inner">
//       <div className="max-w-6xl mx-auto text-center px-4 space-y-3 flex flex-col items-center">
//         <div className="flex items-center space-x-2">
//           <FaLightbulb className="w-5 h-5 text-yellow-300" />
//           <p className="text-lg sm:text-xl font-semibold">DigiCréa-Studio</p>
//         </div>

//         <p className="text-sm sm:text-base opacity-80 flex items-center gap-2 text-center max-w-lg">
//           <FaLightbulb className="w-4 h-4" />
//           Astuces, tendances et stratégies en communication digitale.
//         </p>

//         <p className="text-xs sm:text-sm opacity-70 flex items-center gap-2">
//           <FaCopyright className="w-4 h-4" />
//           {new Date().getFullYear()} DigiCréa-Studio. Tous droits réservés.
//         </p>
//       </div>
//     </footer>
//   );
// }

