"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";

type Template = "steam-classic" | "steam-dark" | "minimal" | "gold";

const templates: { id: Template; name: string; accent: string; bg: string }[] =
  [
    {
      id: "steam-classic",
      name: "Steam Classic",
      accent: "#66c0f4",
      bg: "#1b2838",
    },
    { id: "steam-dark", name: "Abyss", accent: "#a855f7", bg: "#0c0a1a" },
    { id: "minimal", name: "Minimal", accent: "#ffffff", bg: "#111111" },
    { id: "gold", name: "Gold Edition", accent: "#c7a44a", bg: "#1a1507" },
  ];

const achievements = [
  {
    name: "Elden Lord",
    desc: "Atteindre la fin Elden Lord",
    pct: 3.2,
    game: "Elden Ring",
    icon: "👑",
  },
  {
    name: "Platinum Trophy",
    desc: "Obtenir tous les trophées",
    pct: 1.8,
    game: "Dark Souls III",
    icon: "🏆",
  },
  {
    name: "Speedrunner",
    desc: "Terminer en moins de 2h",
    pct: 0.4,
    game: "Celeste",
    icon: "⚡",
  },
];

export function InteractivePoster() {
  const [template, setTemplate] = useState<Template>("steam-classic");
  const [achievementIdx, setAchievementIdx] = useState(0);
  const [message, setMessage] = useState("Mon plus bel exploit !");
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const tmpl = templates.find((t) => t.id === template)!;
  const ach = achievements[achievementIdx];

  return (
    <section
      id="interactive"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Subtle bg glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-colors duration-700"
        style={{
          background: `radial-gradient(ellipse at 60% 50%, ${tmpl.accent}08 0%, transparent 60%)`,
        }}
      />

      <div ref={sectionRef} className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#66c0f4]/10 border border-[#66c0f4]/20 mb-4">
            <span className="text-xs font-medium text-[#66c0f4]">
              Essaie par toi-même
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Personnalise en direct
          </h2>
          <p className="mt-4 text-[#8f98a0] max-w-md mx-auto">
            Joue avec les options pour voir le résultat en temps réel.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Template selector */}
            <div>
              <label className="block text-sm font-semibold text-white mb-3">
                Template
              </label>
              <div className="grid grid-cols-2 gap-3">
                {templates.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTemplate(t.id)}
                    className={`relative flex items-center gap-3 px-4 py-3 rounded-xl border transition-all cursor-pointer ${
                      template === t.id
                        ? "border-white/20 bg-white/[0.06]"
                        : "border-white/5 bg-white/[0.02] hover:border-white/10"
                    }`}
                  >
                    <div
                      className="size-4 rounded-full"
                      style={{ backgroundColor: t.accent }}
                    />
                    <span className="text-sm text-white">{t.name}</span>
                    {template === t.id && (
                      <motion.div
                        layoutId="template-indicator"
                        className="absolute inset-0 rounded-xl border-2"
                        style={{ borderColor: t.accent }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Achievement selector */}
            <div>
              <label className="block text-sm font-semibold text-white mb-3">
                Achievement
              </label>
              <div className="space-y-2">
                {achievements.map((a, i) => (
                  <button
                    key={i}
                    onClick={() => setAchievementIdx(i)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left cursor-pointer ${
                      achievementIdx === i
                        ? "border-white/20 bg-white/[0.06]"
                        : "border-white/5 bg-white/[0.02] hover:border-white/10"
                    }`}
                  >
                    <span className="text-xl">{a.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-white truncate">
                        {a.name}
                      </div>
                      <div className="text-xs text-[#8f98a0]">
                        {a.game} · {a.pct}%
                      </div>
                    </div>
                    {achievementIdx === i && (
                      <div className="size-2 rounded-full bg-[#66c0f4]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Message perso */}
            <div>
              <label className="block text-sm font-semibold text-white mb-3">
                Ton message perso
              </label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={50}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder:text-[#8f98a0]/50 outline-none focus:border-[#66c0f4]/50 transition-colors"
                placeholder="Écris ton message..."
              />
              <div className="text-right text-[10px] text-[#8f98a0]/40 mt-1">
                {message.length}/50
              </div>
            </div>
          </motion.div>

          {/* Live poster preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="flex justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${template}-${achievementIdx}`}
                initial={{ opacity: 0, scale: 0.95, rotateY: 10 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.95, rotateY: -10 }}
                transition={{ duration: 0.4 }}
                className="w-[280px] sm:w-[300px]"
                style={{ perspective: "1000px" }}
              >
                <div
                  className="rounded-2xl overflow-hidden shadow-2xl shadow-black/40 transition-colors duration-500"
                  style={{
                    aspectRatio: "210/297",
                    background: `linear-gradient(135deg, ${tmpl.accent}15, ${tmpl.bg})`,
                  }}
                >
                  <div
                    className="w-full h-full flex flex-col border border-white/5 rounded-2xl transition-colors duration-500"
                    style={{ backgroundColor: `${tmpl.bg}e6` }}
                  >
                    {/* Header */}
                    <div
                      className="h-[25%] flex items-end p-4 transition-colors duration-500"
                      style={{
                        background: `linear-gradient(180deg, ${tmpl.accent}15, transparent)`,
                      }}
                    >
                      <div>
                        <div
                          className="text-[9px] font-mono uppercase tracking-[0.3em] transition-colors duration-500"
                          style={{ color: `${tmpl.accent}90` }}
                        >
                          {ach.game}
                        </div>
                      </div>
                    </div>

                    {/* Achievement */}
                    <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6">
                      <div
                        className="text-[8px] uppercase tracking-[0.3em] font-semibold transition-colors duration-500"
                        style={{ color: `${tmpl.accent}60` }}
                      >
                        Achievement Unlocked
                      </div>

                      <motion.div
                        animate={{
                          boxShadow: [
                            `0 0 20px ${tmpl.accent}30`,
                            `0 0 40px ${tmpl.accent}50`,
                            `0 0 20px ${tmpl.accent}30`,
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="size-14 rounded-xl flex items-center justify-center text-2xl"
                        style={{
                          background: `linear-gradient(135deg, ${tmpl.accent}30, ${tmpl.accent}10)`,
                        }}
                      >
                        {ach.icon}
                      </motion.div>

                      <div className="text-center">
                        <div className="text-base font-bold text-white">
                          {ach.name}
                        </div>
                        <div className="text-[11px] text-[#8f98a0] mt-1">
                          {ach.desc}
                        </div>
                      </div>

                      {/* Rarity */}
                      <div className="flex items-center gap-2 mt-2">
                        <span
                          className="text-lg font-bold transition-colors duration-500"
                          style={{ color: tmpl.accent }}
                        >
                          {ach.pct}%
                        </span>
                        <span
                          className="text-[9px] font-semibold uppercase tracking-wider transition-colors duration-500"
                          style={{ color: tmpl.accent }}
                        >
                          Ultra Rare
                        </span>
                      </div>

                      {/* Progress */}
                      <div className="w-full max-w-[160px] h-1 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.max(ach.pct, 2)}%` }}
                          transition={{ duration: 1 }}
                          className="h-full rounded-full transition-colors duration-500"
                          style={{ backgroundColor: tmpl.accent }}
                        />
                      </div>

                      {/* Message */}
                      {message && (
                        <motion.div
                          key={message}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/5"
                        >
                          <p className="text-[10px] text-[#8f98a0] text-center italic">
                            &ldquo;{message}&rdquo;
                          </p>
                        </motion.div>
                      )}
                    </div>

                    {/* Player */}
                    <div className="flex items-center gap-3 p-4 border-t border-white/5">
                      <div
                        className="size-7 rounded-full transition-colors duration-500"
                        style={{
                          background: `linear-gradient(135deg, ${tmpl.accent}, ${tmpl.accent}50)`,
                        }}
                      />
                      <div>
                        <div className="text-[11px] font-semibold text-white">
                          GamerPro
                        </div>
                        <div className="text-[9px] text-[#8f98a0]">
                          4 avr. 2026 · 520h
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
