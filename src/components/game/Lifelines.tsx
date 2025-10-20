import { LifelinesEnum } from "../../lib/constant";
import type { Lifelines } from "../../types";

export default function Lifelines({ lifelines, onUse }:{lifelines:Lifelines, onUse:(type:string)=>void}) {
  return (
    <div className="flex gap-6 mt-6 justify-center md:justify-start">
      {[
        { type: LifelinesEnum.fiftyFifty, label: "50/50" },
        { type: LifelinesEnum.audience, label: "الجمهور" },
        { type: LifelinesEnum.phone, label: "مكالمة صديق" },
      ].map((item) => (
        <button
          key={item.type}
          disabled={lifelines[item.type as keyof Lifelines].used}
          onClick={() => onUse(item.type)}
          className={`p-3 disabled:cursor-not-allowed cursor-pointer disabled:opacity-50 rounded-full font-bold text-lg border-2 ${
            lifelines[item.type as keyof Lifelines]
              ? "bg-blue-600 border-blue-400 hover:bg-blue-500"
              : "bg-gray-500 border-gray-400 cursor-not-allowed"
          } shadow-md transition transform hover:scale-110`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
