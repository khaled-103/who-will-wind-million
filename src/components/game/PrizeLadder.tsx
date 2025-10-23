"use client";
import { motion } from "framer-motion";

export default function PrizeLadder({
  prizes,
  currentIndex,
}: {
  prizes: number[];
  currentIndex: number;
}) {
  return (
    <div className="fixed md:start-2 start-1 top-1 lg:w-64 md:w-44 w-16 h-[96vh]  md:rounded-3xl rounded-2xl p-0.5 md:p-3 shadow-[0_0_25px_rgba(255,215,0,0.3)]  border-yellow-500 flex flex-col">
      <ul className="flex flex-col-reverse flex-1 gap-2">
        {prizes.map((prize, index) => {
          const isCurrent = index === currentIndex;

          return (
            <motion.li
              key={index}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex justify-center lg:justify-between items-center px-1 md:px-2 rounded-xl transition-all duration-300 border border-transparent ${
                isCurrent
                  ? "bg-yellow-500 text-black shadow-lg shadow-yellow-400/70 scale-105 border-yellow-300"
                  : "bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-gray-200 hover:scale-[1.02] hover:border-yellow-500/40"
              }`}
              style={{ flex: 1 }}
            >
              <span
                className={`hidden lg:inline truncate ${
                  isCurrent
                    ? "font-extrabold text-lg drop-shadow-[0_0_6px_rgba(0,0,0,0.4)]"
                    : "text-sm sm:text-base font-bold"
                }`}
              >
                سؤال {index + 1}
              </span>
              <span
                className={`truncate ${
                  isCurrent
                    ? "font-extrabold text-lg"
                    : "text-[.7rem] md:text-base font-semibold"
                }`}
              >
                {prize.toLocaleString()}
              </span>

              {isCurrent && (
                <motion.div
                  className="absolute inset-0 rounded-xl bg-yellow-400/20 blur-md"
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
