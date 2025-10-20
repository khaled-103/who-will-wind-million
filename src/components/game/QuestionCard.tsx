import type React from "react";
import type { Answer, AudienceHelpChartOption, Lifelines, Question } from "../../types";
import AudienceHelpChart from "./AudienceHelpChart";

export default function QuestionCard({
  question,
  selectedAnswer,
  isCurrentQuestionAnswered,
  onSelectAnswer,
  lifelines
}: {
  question: Question;
  selectedAnswer: Answer | null;
  isCurrentQuestionAnswered: boolean;
  onSelectAnswer: (answer: Answer) => void;
  lifelines: Lifelines
}) {
  const arabicLabels = ["أ", "ب", "ج", "د"];

  let questionText: React.ReactNode = question.text;
  if (lifelines.phone.used && question.id === lifelines.phone.by)
    questionText = "مكالمة صديق يوصي باختيار الإجابة الصحيحة!" + question.options.find(ans => ans.id === question.correctId)?.text;
  else if (lifelines.audience.used && question.id === lifelines.audience.by) {
    const options: AudienceHelpChartOption = [];
    const correctPercent = Math.floor(Math.random() * 15) + 60;
    let remainingPercent = 100 - correctPercent;
    console.log(correctPercent, remainingPercent);

    question.options.forEach((option,index) => {
      if (option.id === question.correctId) {
        options.push({ id: option.id, text: option.text, percent: correctPercent });
      } else {
        let optoinPercent = Math.floor(Math.random() * remainingPercent);
        remainingPercent -= optoinPercent;
        if(index === question.options.length -1)
          optoinPercent += remainingPercent;
        options.push({ id: option.id, text: option.text, percent: optoinPercent });

      }
    });
    questionText = <AudienceHelpChart options={options} />;
  }

  return (
    <div className="w-full max-w-5xl mx-autorounded-3xl transition-all duration-500">
      {/* السؤال */}
      <h2 className="text-center mx-auto text-lg md:text-3xl  font-extrabold mb-4 sm:mb-6 leading-relaxed tracking-wide bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
        {questionText}
      </h2>

      {/* الخيارات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
        {question.options.map((opt, index) => {
          const isDiscarded = lifelines.fiftyFifty.used && question.id === lifelines.fiftyFifty.by && lifelines.fiftyFifty.discardedAnswers?.some(ans => ans.id === opt.id);
          const isCorrect = opt.id === question.correctId;
          const isSelected = opt.id === selectedAnswer?.id;

          // الألوان الأساسية والـ hover
          const baseClasses =
            "relative p-5 rounded-3xl text-lg font-semibold flex items-center justify-between text-right min-h-[70px] sm:min-h-[90px] transition-transform duration-300 transform focus:outline-none focus:ring-4 focus:ring-yellow-400 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 shadow-lg";
          let bgClasses =
            "bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 border border-yellow-400 text-white shadow-[0_8px_15px_rgba(0,0,0,0.3)]";
          let hoverClasses =
            "hover:scale-101  hover:bg-gradient-to-br hover:from-yellow-600 hover:via-yellow-500 hover:to-yellow-600";

          if (isCurrentQuestionAnswered) {
            if (isCorrect) {
              bgClasses =
                "bg-gradient-to-r from-green-500 via-green-600 to-green-500 border-green-400 text-white shadow-[0_0_25px_rgba(0,255,0,0.7)] scale-105";
              hoverClasses = "";
            } else if (isSelected) {
              bgClasses =
                "bg-gradient-to-r from-red-500 via-red-600 to-red-500 border-red-400 text-white shadow-[0_0_25px_rgba(255,0,0,0.7)] scale-105";
              hoverClasses = "";
            }
          }

          return (
            <button
              key={opt.id}
              onClick={() => onSelectAnswer(opt)}
              className={`${baseClasses} ${bgClasses} ${!(isCurrentQuestionAnswered || isDiscarded) ? hoverClasses : ""}`}
              disabled={isCurrentQuestionAnswered || isDiscarded}
            >
              {/* الحرف العربي */}
              <span className="absolute right-4 text-yellow-400 text-xl font-bold">
                {arabicLabels[index]}.
              </span>

              {/* نص الخيار */}
              {!isDiscarded && <span className="mr-12 text-base sm:text-lg truncate">{opt.text}</span>}

              {/* علامة الصح والخطأ */}
              {isCurrentQuestionAnswered && isCorrect && (
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-green-300 text-2xl sm:text-3xl animate-pulse drop-shadow-lg">
                  ✔
                </span>
              )}
              {isCurrentQuestionAnswered && isSelected && !isCorrect && (
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-red-300 text-2xl sm:text-3xl animate-pulse drop-shadow-lg">
                  ✘
                </span>
              )}

              {/* shine effect */}
              {!isCurrentQuestionAnswered && (
                <span className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 opacity-0 group-hover:opacity-20 transition-opacity"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
