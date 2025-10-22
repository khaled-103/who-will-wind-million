import type { Answer } from "../../types";

export default function OptionButton({
  option,
  index,
  isDiscarded,
  isSelected,
  isCorrect,
  isAnswered,
  onSelect,
}: {
  option: Answer;
  index: number;
  isDiscarded: boolean;
  isSelected: boolean;
  isCorrect: boolean;
  isAnswered: boolean;
  onSelect: (ans: Answer) => void;
}) {
  // Compute styles based on state
  let style =
    "bg-gradient-to-b from-[#1b2735] to-[#090a0f] border-yellow-500 text-yellow-100 hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:scale-[1.02]";
  if (isAnswered) {
    if (isCorrect) style = "bg-gradient-to-b from-green-600 to-green-800 text-white border-green-400 shadow-[0_0_25px_rgba(0,255,0,0.5)] scale-105";
    else if (isSelected) style = "bg-gradient-to-b from-red-700 to-red-900 text-white border-red-400 shadow-[0_0_25px_rgba(255,0,0,0.5)] scale-105";
    else style = "bg-gradient-to-b from-gray-800 to-gray-900 text-gray-400 border-gray-600 opacity-70";
  }

  return (
    <button
      key={option.id}
      onClick={() => onSelect(option)}
      disabled={isAnswered || isDiscarded}
      className={`relative cursor-pointer group overflow-hidden rounded-full border-2 text-lg sm:text-xl font-bold tracking-wide flex items-center justify-center h-[70px] sm:h-[90px] transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.1)] ${style}`}
      aria-label={`خيار ${["أ", "ب", "ج", "د"][index]}: ${option.text}`}
    >
      {/* Shine overlay */}
      <span className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(255,255,0,0.5)_0%,transparent_70%)]"></span>
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/10 to-transparent animate-[shine_2s_linear_infinite]"></span>

      {/* Arabic label */}
      <span className="absolute right-6 text-yellow-400 font-extrabold text-2xl">{["أ", "ب", "ج", "د"][index]}.</span>

      {/* Option text */}
      {!isDiscarded && <span className="z-10 px-10 text-center truncate">{option.text}</span>}
    </button>
  );
}
