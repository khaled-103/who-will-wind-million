export default function PrizeLadder({
  prizes,
  currentIndex,
}: {
  prizes: number[];
  currentIndex: number;
}) {

  return (
    <div className="fixed start-2 h-[96vh] top-1 rounded-3xl p-2 w-64 shadow-2xl border-2 border-yellow-500 flex flex-col">
      <ul className="flex flex-col-reverse flex-1 gap-2">
        {prizes.map((prize, index) => {
          const isCurrent = index === currentIndex;

          // ألوان السؤال الحالي
          const bgClass = isCurrent
            ? "bg-yellow-500 text-black shadow shadow-yellow-400/60 scale-105"
            : "bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 text-white";

          const textClass = isCurrent ? "font-extrabold text-lg" : "text-base font-semibold";

          return (
            <li
              key={index}
              className={`flex  px-2 justify-between items-center rounded-xl transition-all duration-300 ${bgClass} ${textClass}`}
              style={{ flex: 1 }} // تقسيم المساحة بالتساوي بين جميع العناصر
            >
              <span className="text-sm sm:text-base truncate">سؤال {index + 1}</span>
              <span className="text-sm sm:text-base truncate">{prize}$</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
