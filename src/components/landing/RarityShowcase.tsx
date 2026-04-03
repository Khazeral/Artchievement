"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";

const tiers = [
  {
    name: "Ultra Rare",
    range: "< 5%",
    color: "#ff6b35",
    gradient: "from-orange-500 via-red-500 to-amber-500",
    glow: "shadow-orange-500/30",
    example: { pct: 2.1, ach: "Platinum God", game: "The Binding of Isaac" },
    description: "Seule une poignée de joueurs a réussi cet exploit. Légende.",
  },
  {
    name: "Rare",
    range: "5 – 15%",
    color: "#a855f7",
    gradient: "from-purple-500 via-pink-500 to-indigo-500",
    glow: "shadow-purple-500/30",
    example: { pct: 8.7, ach: "Master of Arena", game: "Hades" },
    description:
      "Un accomplissement qui impressionne. Tu fais partie de l'élite.",
  },
  {
    name: "Uncommon",
    range: "15 – 40%",
    color: "#66c0f4",
    gradient: "from-blue-400 via-cyan-400 to-sky-500",
    glow: "shadow-blue-400/30",
    example: { pct: 27.3, ach: "True Ending", game: "Hollow Knight" },
    description: "Au-dessus de la moyenne. Un vrai joueur s'exprime.",
  },
  {
    name: "Common",
    range: "> 40%",
    color: "#8f98a0",
    gradient: "from-gray-400 via-gray-500 to-gray-400",
    glow: "shadow-gray-400/20",
    example: { pct: 64.5, ach: "First Blood", game: "Counter-Strike 2" },
    description: "Un premier pas dans l'aventure. Chaque succès compte !",
  },
];

function TierCard({
  tier,
  index,
  isSelected,
  onSelect,
}: {
  tier: (typeof tiers)[number];
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.button
        onClick={onSelect}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
          isSelected
            ? "border-white/15 bg-white/[0.06]"
            : "border-white/5 bg-white/[0.02] hover:border-white/10"
        }`}
      >
        <div className="flex items-center gap-3 mb-3">
          {/* Color dot with glow */}
          <motion.div
            animate={
              isSelected
                ? {
                    boxShadow: [
                      `0 0 10px ${tier.color}40`,
                      `0 0 25px ${tier.color}60`,
                      `0 0 10px ${tier.color}40`,
                    ],
                  }
                : {}
            }
            transition={{ duration: 2, repeat: Infinity }}
            className="size-3 rounded-full"
            style={{ backgroundColor: tier.color }}
          />
          <span className="text-sm font-bold text-white">{tier.name}</span>
          <span className="text-xs text-[#8f98a0] ml-auto font-mono">
            {tier.range}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={
              inView
                ? {
                    width: `${tier.name === "Common" ? 70 : tier.name === "Uncommon" ? 35 : tier.name === "Rare" ? 12 : 5}%`,
                  }
                : {}
            }
            transition={{ duration: 1.2, delay: index * 0.15 }}
            className={`h-full rounded-full bg-gradient-to-r ${tier.gradient}`}
          />
        </div>

        {/* Example */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-lg font-bold" style={{ color: tier.color }}>
            {tier.example.pct}%
          </span>
          <div className="min-w-0">
            <div className="text-xs text-white font-semibold truncate">
              {tier.example.ach}
            </div>
            <div className="text-[10px] text-[#8f98a0] truncate">
              {tier.example.game}
            </div>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}

export function RarityShowcase() {
  const [selected, setSelected] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const tier = tiers[selected];

  return (
    <section id="rarity" className="relative py-24 lg:py-32">
      <div ref={sectionRef} className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#66c0f4]/10 border border-[#66c0f4]/20 mb-4">
            <span className="text-xs font-medium text-[#66c0f4]">
              Système de rareté
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Chaque achievement a sa valeur
          </h2>
          <p className="mt-4 text-[#8f98a0] max-w-md mx-auto">
            On récupère la rareté mondiale pour mettre en valeur tes exploits
            les plus impressionnants.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Tier cards */}
          <div className="space-y-3">
            {tiers.map((t, i) => (
              <TierCard
                key={t.name}
                tier={t}
                index={i}
                isSelected={selected === i}
                onSelect={() => setSelected(i)}
              />
            ))}
          </div>

          {/* Detail view */}
          <motion.div
            key={selected}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex justify-center"
          >
            <div
              className="relative w-[280px] sm:w-[320px] aspect-square rounded-3xl p-8 flex flex-col items-center justify-center text-center transition-all duration-500"
              style={{
                background: `radial-gradient(circle at center, ${tier.color}15, ${tier.color}05)`,
                boxShadow: `0 0 80px ${tier.color}15, inset 0 0 60px ${tier.color}08`,
              }}
            >
              {/* Animated ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 rounded-full border border-dashed"
                style={{ borderColor: `${tier.color}20` }}
              />

              {/* Percentage */}
              <motion.div
                key={`pct-${selected}`}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="text-6xl font-bold mb-2"
                style={{ color: tier.color }}
              >
                {tier.example.pct}%
              </motion.div>

              <div className="text-xl font-bold text-white mb-1">
                {tier.name}
              </div>
              <div className="text-sm text-[#8f98a0] mb-4">
                {tier.range} des joueurs
              </div>

              <div className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/5">
                <div className="text-sm font-semibold text-white">
                  {tier.example.ach}
                </div>
                <div className="text-xs text-[#8f98a0]">
                  {tier.example.game}
                </div>
              </div>

              <p className="mt-4 text-xs text-[#8f98a0] leading-relaxed max-w-[220px]">
                {tier.description}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
