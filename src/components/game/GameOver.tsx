import { motion } from "framer-motion";

export default function GameOver({
  currentQuestionIndex,
  amount,
  handleNextRound,
}: {
  currentQuestionIndex: number;
  amount: number;
  handleNextRound: () => void;
}) {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden bg-gradient-to-b from-[#0b0c10] via-[#0e1320] to-[#010409] text-center text-white">
      {/* خلفية مضيئة متحركة */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.3)_0%,transparent_70%)]"
      />

      {/* النص الرئيسي */}
      <motion.h1
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 8, stiffness: 120 }}
        className={`text-6xl sm:text-7xl font-extrabold tracking-wider mb-4 text-red-500 drop-shadow-[0_0_30px_rgba(255,0,0,0.5)]`}
      >
        انتهت اللعبة
      </motion.h1>

      {/* المبلغ أو الرسالة */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-2xl sm:text-3xl font-medium text-gray-300"
      >
        {currentQuestionIndex > 0 ? (
          <>
            لقد فزت بمبلغ{" "}
            <span className="text-yellow-400 font-extrabold mx-2 drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]">
              {amount}$
            </span>
            🏆
          </>
        ) : (
          "لم تحصل على أي جائزة هذه المرة 😞"
        )}
      </motion.p>

      {/* تأثير  تحت النص */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1 }}
        className="absolute bottom-32 w-[300px] h-[120px] bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.6)_0%,transparent_70%)] blur-3xl"
      />

      {/* زر إعادة المحاولة */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2 }}
        onClick={handleNextRound}
        className="relative mt-12 cursor-pointer bg-gradient-to-r from-[#facc15] via-yellow-400 to-[#facc15] 
          text-black px-10 py-4 rounded-full font-bold text-xl tracking-wide 
          shadow-[0_0_25px_rgba(255,215,0,0.5)] hover:scale-105 
          hover:shadow-[0_0_40px_rgba(255,215,0,0.8)] transition-all"
      >
        🔁 إعادة المحاولة
      </motion.button>

      
    </div>
  );
}
