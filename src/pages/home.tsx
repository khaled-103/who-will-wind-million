// src/pages/Home.tsx
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import GameRules from "../components/home/GameRules";
import Header from "../components/home/Header";
import PrimaryButton from "../components/ui/PrimaryButton";
import { handleFullScreen } from "../lib/helper";

export default function Home() {
  const navigate = useNavigate();

  function handleStartGame() {
    handleFullScreen();
    navigate("/new-game");
  }

  return (
    <main className="min-h-screen py-4 flex flex-col items-center justify-center px-4 ">
      {/* بطاقة المحتوى الرئيسية */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-6 rounded-3xl bg-gray-800/90  shadow-lg backdrop-blur-sm flex flex-col gap-4"
      >
        {/* Header */}
        <Header />

        {/* Game Rules */}
        <GameRules />

        {/* زر البداية */}
        <PrimaryButton
          onClick={handleStartGame}
          className="w-full py-3 text-lg bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-xl shadow-md transition-colors"
        >
          🚀 ابدأ اللعبة
        </PrimaryButton>
      </motion.div>

      {/* Footer */}
      <footer className="mt-8 text-sm text-millionaire-gold/70 text-center">
        © {new Date().getFullYear()} — محاكاة تعليمية لأغراض التمرين
      </footer>
    </main>
  );
}
