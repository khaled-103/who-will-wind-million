import { useEffect, useState } from "react";

type CircularTimerProps = {
  duration: number; // بالثواني
  size?: number; // قطر الدائرة بالبيكسل
  strokeWidth?: number;
  onTimeOut: () => void;
  isPaused?: boolean;
};

export default function CircularTimer({
  duration,
  size = 120,
  strokeWidth = 6,
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

  return (
    <div className="flex flex-col items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#444"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
        <defs>
          <linearGradient id="gradient" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#f87171" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute text-yellow-400 font-bold text-lg sm:text-xl mt-1">
        {timeLeft}s
      </span>
    </div>
  );
}
