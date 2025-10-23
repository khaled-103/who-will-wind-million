import { AnimatePresence, motion } from "framer-motion";
import type { Answer, AudienceHelpChartOption, Lifelines, LifeLinesKeys, Question } from "../../types";
import AudienceHelpChart from "./AudienceHelpChart";
import { LifelinesEnum } from "../../lib/constant";
import OptionButton from "./OptionButton";

function getQuestionText({ question, lifelines }: { question: Question; lifelines: Lifelines }) {
  for (const key in LifelinesEnum) {
    const helper = lifelines.helpers[key as LifeLinesKeys];
    if (helper.used && question.id === helper.by && lifelines.lastUsed === key) {
      if (key === "phone") {
        return (
          <p className="text-center text-yellow-400 font-bold animate-pulse">
            📞 صديقك يوصي بالإجابة:{" "}
            <span className="text-green-400 font-extrabold">
              {question.options.find((ans) => ans.id === question.correctId)?.text}
            </span>
          </p>
        );
      } else if (key === "audience") {
        const options: AudienceHelpChartOption = [];
        const correctPercent = Math.floor(Math.random() * 15) + 60;
        let remainingPercent = 100 - correctPercent;

        question.options.forEach((option, index) => {
          if (option.id === question.correctId) {
            options.push({ id: option.id, text: option.text, percent: correctPercent });
          } else {
            let percent = Math.floor(Math.random() * remainingPercent);
            remainingPercent -= percent;
            if (index === question.options.length - 1) percent += remainingPercent;
            options.push({ id: option.id, text: option.text, percent });
          }
        });
        return <AudienceHelpChart options={options} />;
      }
    }
  }

  return question.text;
}


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
  const questionText = getQuestionText({ question, lifelines });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl mx-auto rounded-3xl transition-all duration-500"
      >
        {/* Question */}
        <motion.h2
          className="text-center mx-auto text-lg md:text-2xl font-extrabold mb-6 leading-relaxed tracking-wide bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_2px_6px_rgba(255,255,255,0.2)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {questionText}
        </motion.h2>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4">
          {question.options.map((opt, index) => {
            const isDiscarded =
              lifelines.helpers.fiftyFifty.used &&
              question.id === lifelines.helpers.fiftyFifty.by &&
              lifelines.helpers.fiftyFifty.discardedAnswers?.some((ans) => ans.id === opt.id);
            const isCorrect = opt.id === question.correctId;
            const isSelected = opt.id === selectedAnswer?.id;

            return (
              <OptionButton
                key={opt.id}
                option={opt}
                index={index}
                isDiscarded={!!isDiscarded}
                isCorrect={isCorrect}
                isSelected={isSelected}
                isAnswered={isCurrentQuestionAnswered}
                onSelect={onSelectAnswer}
              />
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
