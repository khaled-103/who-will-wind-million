import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type CircularTimerProps = {
  duration: number;
  size?: number;
  strokeWidth?: number;
  onTimeOut: () => void;
  isPaused?: boolean;
};

export default function CircularTimer({
  duration,
  size = 90,
  strokeWidth = 8,
  onTimeOut,
  isPaused = false,
}: CircularTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = timeLeft / duration;
  const offset = circumference * (1 - progress);

  useEffect(() => {
    if (isPaused) return;
    if (timeLeft <= 0) {
      onTimeOut();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, isPaused, onTimeOut]);

  // 🎨 ألوان أكثر تدرجًا واحترافية مع روح اللعبة الأصلية
  const getColor = () => {
    const ratio = timeLeft / duration;
    if (ratio > 0.5) return "#3B82F6"; // أزرق هادئ
    if (ratio > 0.25) return "#FACC15"; // أصفر ذهبي
    return "#EF4444"; // أحمر تحذيري
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* الدائرة */}
      <svg width={size} height={size} className="transform -rotate-90">
        {/* خلفية رمادية شفافة */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* الدائرة المتحركة */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor()}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "linear" }}
        />
      </svg>

      {/* النص في المنتصف */}
      <motion.span
        className="absolute font-extrabold tracking-wide"
        style={{
          color:
            timeLeft <= 5
              ? "#EF4444" // أحمر تحذيري
              : timeLeft <= 10
              ? "#FACC15" // ذهبي
              : "#FFFFFF", // أبيض في البداية
          fontSize: size / 3.2,
          textShadow: "0 0 6px rgba(0,0,0,0.6)",
        }}
        animate={{ scale: timeLeft <= 5 ? 1.4 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {timeLeft}
      </motion.span>
    </div>
  );
}
