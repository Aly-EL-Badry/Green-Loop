"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "#home", label: "الرئيسية" },
    { href: "#calculator", label: "احسب أثرك" },
    { href: "#sponsors", label: "داعمينا" },
  ];

  return (
    <header className="fixed top-3 left-0 right-0 z-50 px-3 sm:px-0">
      <nav
        className="mx-auto bg-eco-700 rounded-2xl transition-all duration-700 ease-out max-w-7xl px-4 sm:px-6 md:px-12 lg:px-16"
        style={{
          paddingTop: scrolled ? "14px" : "11px",
          paddingBottom: scrolled ? "14px" : "11px",
          boxShadow: scrolled
            ? "0 8px 25px -4px rgba(34, 197, 94, 0.22)"
            : "0 4px 12px -2px rgba(0, 0, 0, 0.08)",
        }}
      >
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center">
              <svg
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 sm:w-9 sm:h-9"
              >
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  opacity="0.4"
                />
                <path
                  d="M20 8C20 8 28 14 28 22C28 26 24 30 20 30C16 30 12 26 12 22C12 18 16 14 20 14"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="rgba(255,255,255,0.1)"
                />
                <path
                  d="M20 14V24"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M20 18L24 15"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="text-white font-bold text-lg sm:text-xl tracking-tight">
              Green Loop
            </span>
          </div>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-white/90 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="فتح القائمة"
            aria-expanded={menuOpen}
            className="md:hidden text-white p-2 -mr-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            menuOpen ? "max-h-60 opacity-100 mt-3" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="flex flex-col gap-1 pb-2">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-white/90 hover:text-white hover:bg-white/10 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
