"use client";

import { motion } from "motion/react";
import { SteamIdInput } from "./SteamIdInput";

/**
 * Simple deterministic pseudo-random seeded from index.
 * Avoids hydration mismatch caused by Math.random().
 */
function seeded(index: number, offset = 0): number {
  const x = Math.sin((index + 1) * 9301 + offset * 4729) * 49297;
  return x - Math.floor(x); // 0..1
}

/** Pre-computed particle data so server and client always match */
const PARTICLES = Array.from({ length: 20 }).map((_, i) => ({
  width: seeded(i, 0) * 4 + 1,
  height: seeded(i, 1) * 4 + 1,
  left: seeded(i, 2) * 100,
  top: seeded(i, 3) * 100,
  opacity: seeded(i, 4) * 0.3 + 0.05,
  xDrift: seeded(i, 5) * 20 - 10,
  duration: seeded(i, 6) * 6 + 4,
  delay: seeded(i, 7) * 3,
}));

/** Floating particles background */
function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#66c0f4]"
          style={{
            width: p.width,
            height: p.height,
            left: `${p.left}%`,
            top: `${p.top}%`,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, p.xDrift, 0],
            opacity: [0.05, 0.3, 0.05],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

/** Animated demo poster card */
function DemoPoster() {
  return (
    <motion.div
      initial={{ rotateY: 10, rotateX: 5, opacity: 0 }}
      animate={{ rotateY: 0, rotateX: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative w-[280px] sm:w-[320px] perspective-[1000px]"
    >
      <motion.div
        whileHover={{ rotateY: -5, rotateX: -3, scale: 1.03 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
        style={{ aspectRatio: "210/297" }}
      >
        {/* Gradient border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#66c0f4] via-[#2a475e] to-[#66c0f4] p-[2px]">
          <div className="w-full h-full rounded-2xl bg-[#1b2838] flex flex-col">
            {/* Header with game art */}
            <div className="relative h-[30%] bg-gradient-to-b from-[#2a475e] to-[#1b2838] flex items-end p-4">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1b2838]" />
              <div className="relative z-10">
                <div className="text-[10px] text-[#66c0f4] font-mono uppercase tracking-widest">
                  Steam Game
                </div>
                <div className="text-lg font-bold text-white leading-tight mt-1">
                  Elden Ring
                </div>
              </div>
            </div>

            {/* Achievement center */}
            <div className="flex-1 flex flex-col items-center justify-center gap-3 px-4">
              <div className="text-[9px] uppercase tracking-[0.3em] text-[#66c0f4]/60 font-semibold">
                Achievement Unlocked
              </div>

              {/* Achievement icon placeholder */}
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(255,107,53,0.3)",
                    "0 0 40px rgba(255,107,53,0.5)",
                    "0 0 20px rgba(255,107,53,0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="size-16 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center"
              >
                <span className="text-2xl">🏆</span>
              </motion.div>

              <div className="text-center">
                <div className="text-base font-bold text-white">Elden Lord</div>
                <div className="text-xs text-[#8f98a0] mt-1">
                  Atteindre la fin &ldquo;Elden Lord&rdquo;
                </div>
              </div>

              {/* Rarity */}
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xl font-bold text-orange-400">3.2%</span>
                <span className="text-[10px] font-semibold text-orange-400 uppercase tracking-wider">
                  Ultra Rare
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full max-w-[180px] h-1.5 rounded-full bg-[#2a475e] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "3.2%" }}
                  transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-500"
                />
              </div>
            </div>

            {/* Player section */}
            <div className="flex items-center gap-3 p-4 border-t border-white/5">
              <div className="size-8 rounded-full bg-gradient-to-br from-[#66c0f4] to-[#2a475e]" />
              <div className="flex-1">
                <div className="text-xs font-semibold text-white">
                  PlayerOne
                </div>
                <div className="text-[10px] text-[#8f98a0]">
                  12 jan. 2025 · 342h
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Shine overlay */}
        <motion.div
          animate={{ x: ["-100%", "200%"] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 4,
            ease: "easeInOut",
          }}
          className="absolute inset-0 w-[40%] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg] pointer-events-none"
        />
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e1419] via-[#0e1419] to-[#1b2838]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(102,192,244,0.08)_0%,transparent_70%)]" />
      <Particles />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Left content */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#66c0f4]/10 border border-[#66c0f4]/20 mb-6"
          >
            <span className="size-2 rounded-full bg-[#66c0f4] animate-pulse" />
            <span className="text-xs font-medium text-[#66c0f4]">
              Gratuit &middot; Aucun compte requis
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight"
          >
            Tes achievements
            <br />
            méritent un{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#66c0f4] to-[#4db2e5]">
              poster
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg text-[#8f98a0] max-w-md leading-relaxed"
          >
            Transforme tes achievements Steam en posters A4 uniques. Choisis ton
            succès, personnalise le design, et télécharge en haute résolution.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 w-full"
          >
            <SteamIdInput />
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex items-center gap-4"
          >
            <div className="flex -space-x-2">
              {["🎮", "🕹️", "🏆"].map((emoji, i) => (
                <div
                  key={i}
                  className="size-8 rounded-full bg-[#2a475e] border-2 border-[#0e1419] flex items-center justify-center text-sm"
                >
                  {emoji}
                </div>
              ))}
            </div>
            <p className="text-xs text-[#8f98a0]">
              Rejoint par{" "}
              <span className="text-white font-semibold">2,400+</span> gamers
            </p>
          </motion.div>
        </div>

        {/* Right side — demo poster */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex-shrink-0"
        >
          <DemoPoster />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#8f98a0]/40">
            Scroll
          </span>
          <div className="w-5 h-8 rounded-full border border-[#8f98a0]/20 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 rounded-full bg-[#66c0f4]/60"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
