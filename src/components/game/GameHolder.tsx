import { useReducer, useState } from "react";
import { motion } from "framer-motion";
import QuestionCard from "./QuestionCard";
import PrizeLadder from "./PrizeLadder";
import Lifelines from "./Lifelines";
import Timer from "./Timer";
import FullScreenButton from "../ui/FullScreenButton";
import GameOver from "./GameOver";
import Win from "./Win";
import { useSoundContext } from "../../contexts/SoundContext";
import lifeLinesReducer from "../../reducers/lifeLinesReducer";
import { LifelinesEnum } from "../../lib/constant";
import type { Answer, LifeLinesKeys, Question } from "../../types";

const PRIZES = [
  100, 200, 300, 500, 1000, 2000, 4000, 8000,
  16000, 32000, 64000, 125000, 250000, 500000, 1000000,
];

export default function GameHolder({
  gameQuestions,
  handleNextRound,
}: {
  gameQuestions: Question[];
  handleNextRound: () => void;
}) {
  const { playSound } = useSoundContext();

  // 🎯 State Management
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
  const [answered, setAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  const [lifelines, dispatch] = useReducer(lifeLinesReducer, {
    lastUsed: null,
    helpers: {
      fiftyFifty: { used: false, by: null },
      audience: { used: false, by: null },
      phone: { used: false, by: null },
    },
  });

  const currentQuestion = gameQuestions[currentIndex];

  // 🎮 --- Handlers ---
  function getDiscardedAnswers(type: LifeLinesKeys, question: Question) {
    if (type !== LifelinesEnum.fiftyFifty) return undefined;
    const incorrectAnswers = question.options.filter(
      (a) => a.id !== question.correctId
    );
    return incorrectAnswers.slice(0, 2);
  }
  function handleUseLifeline(type: LifeLinesKeys){
      playSound("click");
      const discardedAnswers = getDiscardedAnswers(type, currentQuestion);

      setTimeout(() => {
        dispatch({
          type,
          payload: { by: currentQuestion.id, discardedAnswers },
        });
      }, 500);
    }
  function handleCorrectAnswer(){
    playSound("correct");
    setTimeout(() => {
      const nextIndex = currentIndex + 1;
      if (nextIndex < gameQuestions.length) {
        setCurrentIndex(nextIndex);
        setSelectedAnswer(null);
        setAnswered(false);
      } else {
        setWin(true);
      }
    }, 3000);
  }

  function handleWrongAnswer() {
    playSound("wrong");
    setTimeout(() => setGameOver(true), 3000);
  }

  function handleAnswer(answer: Answer | null) {
      if (answered) return;
      playSound("click");
      setSelectedAnswer(answer);
      setAnswered(true);
      const isCorrect = answer?.id === currentQuestion.correctId;
      if(isCorrect) handleCorrectAnswer();
      else handleWrongAnswer();
    }

  // 🧠 --- Conditional Rendering ---
  if (gameOver) {
    return (
      <GameOver
        amount={PRIZES[currentIndex - 1]}
        currentQuestionIndex={currentIndex}
        handleNextRound={handleNextRound}
      />
    );
  }

  if (win) {
    return (
      <Win
        amount={PRIZES[gameQuestions.length - 1]}
        handleNextRound={handleNextRound}
      />
    );
  }

  // 🏗️ --- Game Layout ---
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }}
      className="relative mb-8 min-h-screen flex flex-col md:flex-row font-[Cairo] overflow-hidden"
    >
      <FullScreenButton />
      <PrizeLadder prizes={PRIZES} currentIndex={currentIndex} />

      <div className="flex flex-col flex-1 items-center justify-center gap-6 px-4 md:ms-64 ms-16">
        <Lifelines lifelines={lifelines} onUse={handleUseLifeline} />

        <Timer
          key={currentQuestion.id}
          duration={30}
          isPaused={answered}
          onTimeOut={() => handleAnswer(null)}
        />

        <QuestionCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          isCurrentQuestionAnswered={answered}
          onSelectAnswer={handleAnswer}
          lifelines={lifelines}
        />
      </div>
    </motion.div>
  );
}
