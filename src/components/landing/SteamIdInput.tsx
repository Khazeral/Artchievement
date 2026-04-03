"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

export function SteamIdInput() {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    router.push(`/editor?steamid=${encodeURIComponent(value.trim())}`);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <motion.div
        animate={{
          boxShadow: focused
            ? "0 0 0 2px #66c0f4, 0 0 30px rgba(102,192,244,0.15)"
            : "0 0 0 1px rgba(255,255,255,0.08), 0 2px 8px rgba(0,0,0,0.3)",
        }}
        transition={{ duration: 0.2 }}
        className="relative flex items-center rounded-xl bg-[#1b2838] overflow-hidden"
      >
        {/* Steam icon */}
        <div className="pl-4 text-[#8f98a0]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V22l.46-.02c.17.01.35.02.54.02 5.52 0 10-4.48 10-10S17.52 2 12 2zm4.64 10.8c0 1.73-1.41 3.14-3.14 3.14-.37 0-.72-.07-1.05-.18l-1.98.82a2.01 2.01 0 01-2.39-1.11 2.01 2.01 0 011.11-2.61l1.45-.6c.13-.85.6-1.58 1.28-2.05a3.13 3.13 0 014.72 2.59zm-3.14-1.87c-1.04 0-1.88.84-1.88 1.87 0 1.04.84 1.88 1.88 1.88 1.03 0 1.87-.84 1.87-1.88 0-1.03-.84-1.87-1.87-1.87z" />
          </svg>
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Steam ID ou URL de profil..."
          className="flex-1 bg-transparent px-3 py-4 text-white placeholder:text-[#8f98a0]/60 outline-none text-sm"
        />

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mr-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#66c0f4] to-[#4db2e5] text-sm font-semibold text-white shadow-lg shadow-[#66c0f4]/20 hover:shadow-[#66c0f4]/40 transition-shadow cursor-pointer"
        >
          C&apos;est parti !
        </motion.button>
      </motion.div>

      <p className="mt-3 text-center text-xs text-[#8f98a0]/60">
        Ex : 76561198xxxxx ou https://steamcommunity.com/id/pseudo
      </p>
    </form>
  );
}
