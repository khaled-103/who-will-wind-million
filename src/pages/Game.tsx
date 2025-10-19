import { useState } from "react";
import QuestionCard from "../components/game/QuestionCard";
import PrizeLadder from "../components/game/PrizeLadder";
import Lifelines from "../components/game/Lifelines";
import questionsData from "../data/questions.json";
import Timer from "../components/game/Timer";
import { getRandomFromArray } from "../lib/helper";
import type { Answer } from "../types";
const gameQuestions = getRandomFromArray(questionsData,15);
const prizes: number[] = [
  100,      // سؤال 1
  200,      // سؤال 2
  300,      // سؤال 3
  500,      // سؤال 4
  1000,     // سؤال 5
  2000,     // سؤال 6
  4000,     // سؤال 7
  8000,     // سؤال 8
  16000,    // سؤال 9
  32000,    // سؤال 10
  64000,    // سؤال 11
  125000,   // سؤال 12
  250000,   // سؤال 13
  500000,   // سؤال 14
  1000000   // سؤال 15
];


export default function Game() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
  const [isCurrentQuestionAnswered, setIsCurrentQuestionAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [lifelines, setLifelines] = useState({
    fiftyFifty: true,
    audience: true,
    phone: true,
  });

  const currentQuestion = gameQuestions[currentQuestionIndex];
  const handleAnswer = (answer: Answer | null) => {
    if (isCurrentQuestionAnswered) return;
    setSelectedAnswer(answer);
    setIsCurrentQuestionAnswered(true);

    const correct = answer?.id === currentQuestion.correctId;
    if (correct) {
      setTimeout(() => {
        if (currentQuestionIndex + 1 < gameQuestions.length) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedAnswer(null);
          setIsCurrentQuestionAnswered(false);
        } else {
          setIsWin(true);
        }
      }, 2000);
    } else {
      setTimeout(() => {
        setGameOver(true);
      }, 2000);
    }
  };

  if (gameOver) {
    return (
      <div className="flex flex-col items-center justify-center h-screen  text-center text-white">
        <h1 className="text-4xl font-bold mb-4 animate-pulse text-yellow-400">انتهت اللعبة!</h1>
        {currentQuestionIndex > 0 ?
        <p className="text-2xl">لقد فزت بمبلغ: <span className="text-green-400">{prizes[currentQuestionIndex - 1]}₪</span></p> : <p>للاسف لم تحصل على شي</p> }
      </div>
    );
  }

  if (isWin) {
    return (
      <div className="flex flex-col items-center justify-center h-screen  text-center text-white">
        <h1 className="text-4xl font-bold mb-4 animate-pulse text-yellow-400">مبروك لقد حصلت على المليون!</h1>
        <p className="text-2xl">لقد فزت بمبلغ: <span className="text-green-400">{prizes[gameQuestions.length - 1]}₪</span></p>
      </div>
    );
  }

  return (
    <div >

      {/* شريط الجوائز */}
      <PrizeLadder prizes={prizes} currentIndex={currentQuestionIndex} />
      {/* القسم الرئيسي: السؤال والمساعدات */}
      <div className="ms-64 flex flex-col gap-4 items-center">
        <Lifelines lifelines={lifelines} setLifelines={setLifelines} />
        <Timer isPaused={isCurrentQuestionAnswered} key={currentQuestion.id} duration={30} onTimeOut={() => handleAnswer(null)} />
        <QuestionCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          isCurrentQuestionAnswered={isCurrentQuestionAnswered}
          onSelectAnswer={handleAnswer}
        />
      </div>
    </div>
  );
}
