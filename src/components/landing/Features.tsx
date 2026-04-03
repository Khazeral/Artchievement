"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

const features = [
  {
    icon: "🎨",
    title: "4 templates uniques",
    description:
      "Du Steam Classic au Gold Edition. Chaque template est pensé pour sublimer ton achievement.",
  },
  {
    icon: "✍️",
    title: "Message personnalisé",
    description:
      "Ajoute un petit mot perso : dédicace, date, souvenir. Ton poster, ta touche.",
  },
  {
    icon: "📐",
    title: "Format A4 impression",
    description:
      "Export en 2480×3508px (300 DPI). Prêt à imprimer ou encadrer direct.",
  },
  {
    icon: "🔍",
    title: "Rareté mondiale",
    description:
      "On calcule la rareté en temps réel via l'API Steam. Ton exploit en perspective.",
  },
  {
    icon: "⚡",
    title: "Données automatiques",
    description:
      "Pseudo, avatar, temps de jeu, date de déverrouillage... tout est rempli pour toi.",
  },
  {
    icon: "🆓",
    title: "Gratuit pour commencer",
    description:
      "Preview gratuit. Export HD sans watermark pour seulement 4,90€.",
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#66c0f4]/5 to-transparent pointer-events-none" />

      <motion.div
        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
        className="size-12 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-center text-2xl mb-4"
      >
        {feature.icon}
      </motion.div>

      <h3 className="text-base font-bold text-white mb-2">{feature.title}</h3>
      <p className="text-sm text-[#8f98a0] leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
}

export function Features() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });

  return (
    <section id="features" className="relative py-24 lg:py-32">
      {/* Subtle bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#66c0f4]/[0.02] to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#66c0f4]/10 border border-[#66c0f4]/20 mb-4"
          >
            <span className="text-xs font-medium text-[#66c0f4]">
              Tout ce qu&apos;il faut
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-white"
          >
            Fonctionnalités
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="mt-4 text-[#8f98a0] max-w-md mx-auto"
          >
            Tout est pensé pour que tu obtiennes le poster parfait en quelques
            clics.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
