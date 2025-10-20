import { motion } from "framer-motion";
import { LifelinesEnum } from "../../lib/constant";
import type { Lifelines } from "../../types";

export default function Lifelines({
  lifelines,
  onUse,
}: {
  lifelines: Lifelines;
  onUse: (type: string) => void;
}) {
  const items = [
    { type: LifelinesEnum.fiftyFifty, label: "50/50" },
    { type: LifelinesEnum.audience, label: "الجمهور" },
    { type: LifelinesEnum.phone, label: "مكالمة صديق" },
  ];

  return (
    <div className="flex gap-4 md:gap-6 mt-6 justify-center md:justify-start flex-wrap">
      {items.map((item) => {
        const isUsed = lifelines[item.type as keyof Lifelines].used;

        return (
          <motion.button
            key={item.type}
            disabled={isUsed}
            onClick={() => onUse(item.type)}
            whileHover={!isUsed ? { scale: 1.1 } : {}}
            whileTap={!isUsed ? { scale: 0.95 } : {}}
            className={`relative cursor-pointer flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full font-bold text-base md:text-lg border-2 shadow-lg transition-colors duration-300
              ${
                isUsed
                  ? "bg-gray-500 border-gray-400 cursor-not-allowed opacity-50"
                  : "bg-gradient-to-br from-blue-600 to-blue-500 border-blue-400 hover:from-blue-500 hover:to-blue-400 text-white"
              }
            `}
          >
            {item.label}
            {/* تأثير وميض عند استخدام المساعدة */}
            {isUsed && (
              <motion.div
                className="absolute inset-0 rounded-full bg-white/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
