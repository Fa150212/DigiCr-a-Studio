"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import AuthButton from "../components/AuthButton";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        {/* 🔹 LOGO */}
        <Link
          href="/"
          className="text-2xl font-bold text-blue-900 hover:text-blue-700 transition-colors"
        >
          DigiCréa<span className="text-orange-500">-Studio</span>
        </Link>

        {/* 🔹 MENU DESKTOP */}
        <nav className="hidden md:flex space-x-6 text-blue-900 font-medium items-center">
          <NavLink href="/">Accueil</NavLink>
          <NavLink href="/articles">Articles</NavLink>
          <NavLink href="/about">À propos</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          <AuthButton />
        </nav>

        {/* 🔹 BOUTON BURGER MOBILE */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-blue-900 text-2xl focus:outline-none"
          aria-label="Menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* 🔹 MENU MOBILE */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 flex flex-col items-center py-4 space-y-4 animate-slideDown">
          <NavLink href="/" onClick={() => setMenuOpen(false)}>
            Accueil
          </NavLink>
          <NavLink href="/articles" onClick={() => setMenuOpen(false)}>
            Articles
          </NavLink>
          <NavLink href="/about" onClick={() => setMenuOpen(false)}>
            À propos
          </NavLink>
          <NavLink href="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </NavLink>
          <AuthButton />
        </div>
      )}
    </header>
  );
}

function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="relative group text-lg sm:text-base"
    >
      {children}
      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
    </Link>
  );
}
