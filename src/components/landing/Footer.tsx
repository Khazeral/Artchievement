"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Link from "next/link";
import { SteamIdInput } from "./SteamIdInput";

export function Footer() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  return (
    <>
      {/* CTA Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(102,192,244,0.06)_0%,transparent_60%)] pointer-events-none" />

        <div
          ref={ctaRef}
          className="relative mx-auto max-w-3xl px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
              Prêt à immortaliser
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#66c0f4] to-[#4db2e5]">
                ton exploit ?
              </span>
            </h2>
            <p className="mt-6 text-lg text-[#8f98a0] max-w-md mx-auto">
              C&apos;est gratuit, rapide, et ton profil Steam suffit.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 flex justify-center"
          >
            <SteamIdInput />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="size-7 rounded-lg bg-gradient-to-br from-[#66c0f4] to-[#4db2e5] flex items-center justify-center">
                <span className="text-xs font-bold text-white">A</span>
              </div>
              <span className="text-sm font-bold text-white">
                Art<span className="text-[#66c0f4]">chievement</span>
              </span>
            </Link>

            {/* Links */}
            <div className="flex items-center gap-6 text-sm text-[#8f98a0]">
              <a
                href="#how-it-works"
                className="hover:text-white transition-colors"
              >
                Comment ça marche
              </a>
              <a
                href="#features"
                className="hover:text-white transition-colors"
              >
                Fonctionnalités
              </a>
              <a
                href="https://steamcommunity.com/dev/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                API Steam
              </a>
            </div>

            {/* Legal */}
            <p className="text-xs text-[#8f98a0]/40">
              © 2026 Artchievement. Non affilié à Valve ou Steam.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
