
import { motion } from "framer-motion";
import type { Answer, AudienceHelpChartOption, Lifelines, Question } from "../../types";
import AudienceHelpChart from "./AudienceHelpChart";

export default function QuestionCard({
  question,
  selectedAnswer,
  isCurrentQuestionAnswered,
  onSelectAnswer,
  lifelines,
}: {
  question: Question;
  selectedAnswer: Answer | null;
  isCurrentQuestionAnswered: boolean;
  onSelectAnswer: (answer: Answer) => void;
  lifelines: Lifelines;
}) {

  let questionText: React.ReactNode = question.text;
  if (lifelines.phone.used && question.id === lifelines.phone.by)
    questionText = (
      <p className="text-center text-yellow-400 font-bold animate-pulse">
        📞 صديقك يوصي بالإجابة:{" "}
        <span className="text-green-400 font-extrabold">
          {question.options.find((ans) => ans.id === question.correctId)?.text}
        </span>
      </p>
    );
  else if (lifelines.audience.used && question.id === lifelines.audience.by) {
    const options: AudienceHelpChartOption = [];
    const correctPercent = Math.floor(Math.random() * 15) + 60;
    let remainingPercent = 100 - correctPercent;

    question.options.forEach((option, index) => {
      if (option.id === question.correctId) {
        options.push({ id: option.id, text: option.text, percent: correctPercent });
      } else {
        let optoinPercent = Math.floor(Math.random() * remainingPercent);
        remainingPercent -= optoinPercent;
        if (index === question.options.length - 1) optoinPercent += remainingPercent;
        options.push({ id: option.id, text: option.text, percent: optoinPercent });
      }
    });

    questionText = <AudienceHelpChart options={options} />;
  }

  return (
    <div
      className="w-full max-w-5xl mx-auto rounded-3xl transition-all duration-500"
    >
      {/* السؤال */}
      <motion.h2
        className="text-center mx-auto text-lg md:text-3xl font-extrabold mb-6 leading-relaxed tracking-wide
        bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_2px_6px_rgba(255,255,255,0.2)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {questionText}
      </motion.h2>

      {/* الخيارات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4">
        {question.options.map((opt, index) => {
          const isDiscarded =
            lifelines.fiftyFifty.used &&
            question.id === lifelines.fiftyFifty.by &&
            lifelines.fiftyFifty.discardedAnswers?.some((ans) => ans.id === opt.id);
          const isCorrect = opt.id === question.correctId;
          const isSelected = opt.id === selectedAnswer?.id;

          const base =
            "relative group overflow-hidden rounded-full border-2 text-lg sm:text-xl font-bold tracking-wide flex items-center justify-center h-[70px] sm:h-[90px] transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.1)]";
          let style =
            "bg-gradient-to-b from-[#1b2735] to-[#090a0f] border-yellow-500 text-yellow-100 hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:scale-[1.02]";
          if (isCurrentQuestionAnswered) {
            if (isCorrect) {
              style =
                "bg-gradient-to-b from-green-600 to-green-800 text-white border-green-400 shadow-[0_0_25px_rgba(0,255,0,0.5)] scale-105";
            } else if (isSelected) {
              style =
                "bg-gradient-to-b from-red-700 to-red-900 text-white border-red-400 shadow-[0_0_25px_rgba(255,0,0,0.5)] scale-105";
            } else {
              style =
                "bg-gradient-to-b from-gray-800 to-gray-900 text-gray-400 border-gray-600 opacity-70";
            }
          }

          return (
            <button
              key={opt.id}
              onClick={() => onSelectAnswer(opt)}
              disabled={isCurrentQuestionAnswered || isDiscarded}
              className={`${base} ${style}`}
            >
              {/* تأثير الإضاءة */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(255,255,0,0.5)_0%,transparent_70%)]"></span>

              {/* حافة مضيئة متحركة */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/10 to-transparent animate-[shine_2s_linear_infinite]"></span>

              {/* الحرف العربي */}
              <span className="absolute right-6 text-yellow-400 font-extrabold text-2xl">
                {["أ", "ب", "ج", "د"][index]}.
              </span>

              {/* نص الخيار */}
              {!isDiscarded && (
                <span className="z-10 px-10 text-center truncate">{opt.text}</span>
              )}
            </button>
          );
        })}
      </div>

    </div>
  );
}
