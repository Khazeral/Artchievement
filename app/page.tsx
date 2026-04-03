import type { Metadata } from "next";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { InteractivePoster } from "@/components/landing/InteractivePoster";
import { RarityShowcase } from "@/components/landing/RarityShowcase";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Artchievement — Transforme tes achievements Steam en posters",
  description:
    "Génère un poster A4 personnalisé de tes achievements Steam. Choisis ton succès, personnalise le design, et télécharge en haute résolution.",
  openGraph: {
    title: "Artchievement",
    description: "Transforme tes achievements Steam en posters A4 uniques.",
    type: "website",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0e1419] text-[#c6d4df]">
      <Navbar />
      <Hero />
      <HowItWorks />
      <InteractivePoster />
      <RarityShowcase />
      <Features />
      <Footer />
    </div>
  );
}
