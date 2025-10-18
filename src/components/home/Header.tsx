// src/components/Header.tsx
import { motion } from "framer-motion";
import Logo from "../Logo";

export default function Header() {
  return (
    <header className="text-center mb-6 flex flex-col items-center gap-4">
      <motion.div
        className="w-32 h-32"
        animate={{ rotate: [0, 15, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Logo className="w-full h-full" />
      </motion.div>
      <h1 className="text-5xl font-extrabold text-millionaire-gold tracking-wide mb-2 drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">
        من سيربح المليون؟
      </h1>
      <p className="text-millionaire-gold/90 text-lg italic">
        هل تمتلك المعرفة لتصل إلى المليون؟ 💰
      </p>
    </header>
  );
}