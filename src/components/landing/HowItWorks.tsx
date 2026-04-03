"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Entre ton Steam ID",
    description:
      "Colle ton Steam ID ou ton URL de profil. On récupère tout automatiquement.",
    icon: "🔑",
    color: "#66c0f4",
  },
  {
    number: "02",
    title: "Choisis ton jeu",
    description:
      "Ta bibliothèque s'affiche triée par temps de jeu. Sélectionne le jeu qui compte.",
    icon: "🎮",
    color: "#4caf50",
  },
  {
    number: "03",
    title: "Sélectionne l'achievement",
    description:
      "Parcours tes succès débloqués avec leur rareté. Choisis celui dont tu es le plus fier.",
    icon: "🏆",
    color: "#c7a44a",
  },
  {
    number: "04",
    title: "Personnalise & télécharge",
    description:
      "Ajoute un message perso, choisis un template, et exporte en haute résolution A4.",
    icon: "🖼️",
    color: "#a855f7",
  },
];

function StepCard({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="group relative"
    >
      {/* Connector line (not on last) */}
      {index < steps.length - 1 && (
        <div className="hidden lg:block absolute top-12 left-[calc(100%_-_8px)] w-[calc(100%_-_40px)] h-px">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
            className="h-full bg-gradient-to-r from-white/10 to-transparent origin-left"
          />
        </div>
      )}

      <div className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300">
        {/* Step number */}
        <div
          className="absolute -top-3 right-4 text-xs font-mono font-bold px-2 py-0.5 rounded-md"
          style={{ color: step.color, backgroundColor: `${step.color}15` }}
        >
          {step.number}
        </div>

        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
          className="size-16 rounded-2xl flex items-center justify-center text-3xl mb-4"
          style={{
            background: `linear-gradient(135deg, ${step.color}15, ${step.color}05)`,
            boxShadow: `0 0 30px ${step.color}10`,
          }}
        >
          {step.icon}
        </motion.div>

        <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
        <p className="text-sm text-[#8f98a0] leading-relaxed">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

export function HowItWorks() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#66c0f4]/10 border border-[#66c0f4]/20 mb-4"
          >
            <span className="text-xs font-medium text-[#66c0f4]">
              Simple comme bonjour
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-white"
          >
            Comment ça marche ?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-[#8f98a0] max-w-md mx-auto"
          >
            4 étapes pour transformer ton achievement en œuvre d&apos;art.
          </motion.p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
