import type { Lifelines } from "../../types";

export default function Lifelines({ lifelines, setLifelines }:{lifelines:Lifelines, setLifelines:(lifelines:Lifelines)=>void}) {
  const handleUse = (type:string) => {
    setLifelines({ ...lifelines, [type]: false });
    // هنا يمكن إضافة منطق المساعدة الفعلي
  };

  return (
    <div className="flex gap-6 mt-6 justify-center md:justify-start">
      {[
        { type: "fiftyFifty", label: "50/50" },
        { type: "audience", label: "الجمهور" },
        { type: "phone", label: "مكالمة صديق" },
      ].map((item) => (
        <button
          key={item.type}
          disabled={!lifelines[item.type as keyof Lifelines]}
          onClick={() => handleUse(item.type)}
          className={`p-3 rounded-full font-bold text-lg border-2 ${
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
