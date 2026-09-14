"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-3 left-0 right-0 z-50">
      <nav
        className="mx-auto flex items-center justify-between bg-eco-700 rounded-2xl transition-all duration-700 ease-out max-w-7xl px-6 md:px-12 lg:px-16"
        style={{
          paddingTop: scrolled ? "14px" : "11px",
          paddingBottom: scrolled ? "14px" : "11px",
          boxShadow: scrolled
            ? "0 8px 25px -4px rgba(34, 197, 94, 0.22)"
            : "0 4px 12px -2px rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5">
          {/* Leaf loop icon */}
          <div className="relative w-9 h-9 flex items-center justify-center">
            <svg
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-9 h-9"
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
          <span className="text-white font-bold text-xl tracking-tight">
            Green Loop
          </span>
        </div>

        {/* Navigation Links */}
        <ul className="flex items-center gap-1">
          <li>
            <a
              href="#home"
              className="text-white/90 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
            >
              الرئيسية
            </a>
          </li>
          <li>
            <a
              href="#calculator"
              className="text-white/90 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
            >
              احسب أثرك
            </a>
          </li>
          <li>
            <a
              href="#sponsors"
              className="text-white/90 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
            >
              داعمينا
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
