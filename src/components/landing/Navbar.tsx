"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0e1419]/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative size-8 rounded-lg bg-gradient-to-br from-[#66c0f4] to-[#4db2e5] flex items-center justify-center shadow-lg shadow-[#66c0f4]/20 group-hover:shadow-[#66c0f4]/40 transition-shadow">
            <span className="text-sm font-bold text-white">A</span>
          </div>
          <span className="text-lg font-bold text-white tracking-tight">
            Art<span className="text-[#66c0f4]">chievement</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#how-it-works"
            className="text-sm text-[#8f98a0] hover:text-white transition-colors"
          >
            Comment ça marche
          </a>
          <a
            href="#features"
            className="text-sm text-[#8f98a0] hover:text-white transition-colors"
          >
            Fonctionnalités
          </a>
          <a
            href="#rarity"
            className="text-sm text-[#8f98a0] hover:text-white transition-colors"
          >
            Raretés
          </a>
          <Link
            href="/editor"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#66c0f4] to-[#4db2e5] text-sm font-semibold text-white hover:brightness-110 transition-all shadow-lg shadow-[#66c0f4]/20 hover:shadow-[#66c0f4]/40"
          >
            Créer mon poster
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1 p-2"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-5 h-0.5 bg-white"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-5 h-0.5 bg-white"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block w-5 h-0.5 bg-white"
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-[#0e1419]/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              <a
                href="#how-it-works"
                onClick={() => setMobileOpen(false)}
                className="text-[#8f98a0] hover:text-white transition-colors"
              >
                Comment ça marche
              </a>
              <a
                href="#features"
                onClick={() => setMobileOpen(false)}
                className="text-[#8f98a0] hover:text-white transition-colors"
              >
                Fonctionnalités
              </a>
              <a
                href="#rarity"
                onClick={() => setMobileOpen(false)}
                className="text-[#8f98a0] hover:text-white transition-colors"
              >
                Raretés
              </a>
              <Link
                href="/editor"
                className="mt-2 px-4 py-3 rounded-lg bg-gradient-to-r from-[#66c0f4] to-[#4db2e5] text-center font-semibold text-white"
              >
                Créer mon poster
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
