// src/components/GameRules.tsx
const rules = [
    "لك 15 سؤالًا للوصول إلى المليون.",
    "يمكنك استخدام ثلاث وسائل مساعدة أثناء اللعب.",
    "تنتهي اللعبة عند الإجابة الخاطئة أو نفاد الوقت."
];
export default function GameRules() {
  return (
    <section className="bg-white/10 backdrop-blur-md border-2 border-millionaire-gold rounded-3xl p-6 text-white shadow-[0_0_25px_rgba(255,215,0,0.2)]">
      <h2 className="text-2xl font-bold mb-4 text-millionaire-gold">📜 شروط المسابقة</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-200 leading-relaxed">
        {rules.map((rule,index) => <li key={index}>{rule}</li>)}
      </ul>
    </section>
  );
}
