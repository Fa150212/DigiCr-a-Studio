"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import Link from "next/link";

export default function AuthButton() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Ferme le menu quand on clique à l’extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!session) {
    return (
      <button
        onClick={() => signIn("google")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg text-sm transition"
      >
        Se connecter
      </button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 cursor-pointer focus:outline-none"
      >
        {session.user?.image ? (
          <img
            src={session.user.image}
            alt="photo de profil"
            className="w-8 h-8 rounded-full border border-gray-300"
          />
        ) : (
          <FaUserCircle className="text-3xl text-gray-600" />
        )}
        <span className="text-sm font-medium text-gray-700 hidden sm:inline">
          {session.user?.name?.split(" ")[0]}
        </span>
        <FaChevronDown
          className={`text-gray-500 text-sm transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* 🌙 Menu déroulant */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50 animate-fade-in">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-800">{session.user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
          </div>

          <div className="flex flex-col">
            <Link
              href="/profil"
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              Mon profil
            </Link>
            <Link
              href="/articles"
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              Mes articles
            </Link>
          </div>

          <button
            onClick={() => signOut()}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition border-t border-gray-100"
          >
            Déconnexion
          </button>
        </div>
      )}
    </div>
  );
}

