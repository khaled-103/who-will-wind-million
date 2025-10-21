// src/components/GameRules.tsx
const rules = [
  "لك 15 سؤالًا للوصول إلى المليون.",
  "يمكنك استخدام ثلاث وسائل مساعدة أثناء اللعب.",
  "تنتهي اللعبة عند الإجابة الخاطئة أو نفاد الوقت."
];

export default function GameRules() {
  return (
    <section className="relative bg-gradient-to-br from-yellow-400/20 via-yellow-300/10 to-yellow-400/20 border-2 border-yellow-400 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-md">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-yellow-300 drop-shadow-[0_0_5px_rgba(255,215,0,0.7)]">
        📜 شروط المسابقة
      </h2>
      <ul className="list-decimal list-inside space-y-3 text-white text-base sm:text-lg leading-relaxed">
        {rules.map((rule, index) => (
          <li key={index} className="pl-2">
            {rule}
          </li>
        ))}
      </ul>
    </section>
  );
}
