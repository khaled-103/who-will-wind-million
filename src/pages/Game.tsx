import { useState } from "react";
import QuestionCard from "../components/game/QuestionCard";
import PrizeLadder from "../components/game/PrizeLadder";
import Lifelines from "../components/game/Lifelines";
import questionsData from "../data/questions.json";
import Timer from "../components/game/Timer";
import { getRandomFromArray } from "../lib/helper";
import type { Answer, Lifelines as LifelinesType } from "../types";
import { LifelinesEnum } from "../lib/constant";
import { AnimatePresence, motion } from "framer-motion";
const gameQuestions = getRandomFromArray(questionsData, 15);
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

const handleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};


export default function Game() {
  console.log("game re render");

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
  const [isCurrentQuestionAnswered, setIsCurrentQuestionAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [lifelines, setLifelines] = useState<LifelinesType>({
    fiftyFifty: { used: false, by: null },
    audience: { used: false, by: null },
    phone: { used: false, by: null },
  });

  const currentQuestion = gameQuestions[currentQuestionIndex];
  const handleUseLifline = (type: string) => {
    setTimeout(() => {
      if (type === LifelinesEnum.fiftyFifty) {
        // منطق 50/50
        const incorrectAnswers = currentQuestion.options.filter(answer => answer.id !== currentQuestion.correctId);
        setLifelines(prev => {
          return {
            ...prev,
            "fiftyFifty": { used: true, by: currentQuestion.id, discardedAnswers: incorrectAnswers.slice(0, 2) }
          }
        });
      } else if (type === LifelinesEnum.audience) {
        // منطق مساعدة الجمهور
        setLifelines(prev => {
          return {
            ...prev,
            "audience": { used: true, by: currentQuestion.id }
          }
        });
      } else if (type === LifelinesEnum.phone) {
        // منطق مكالمة صديق
        setLifelines(prev => {
          return {
            ...prev,
            "phone": { used: true, by: currentQuestion.id }
          }
        });
      }
    }, 1000);
  };

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


  // const audioRefs = useRef({});

  // // دالة لتشغيل صوت معين
  // const playSound = (name) => {
  //   const sound = audioRefs.current[name];
  //   if (sound) {
  //     sound.currentTime = 0;
  //     sound.play();
  //   }
  // };

  // // تحميل الأصوات مرة واحدة
  // useEffect(() => {
  //   const names = ["start", "correct", "wrong", "timeout", "win", "lose", "select"];
  //   names.forEach((name) => {
  //     const audio = new Audio(`/sounds/${name}.mp3`);
  //     audioRefs.current[name] = audio;
  //   });
  //   playSound("start");
  // }, []);


  // وضع ملء الشاشة



  // حالات النهاية
  if (gameOver) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center bg-gradient-to-b from-black to-blue-950 text-white px-4">
        <h1 className="text-4xl font-bold mb-4 animate-pulse text-yellow-400">انتهت اللعبة!</h1>
        {currentQuestionIndex > 0 ? (
          <p className="text-2xl">
            لقد فزت بمبلغ:
            <span className="text-green-400 font-bold ms-2">
              {prizes[currentQuestionIndex - 1]}₪
            </span>
          </p>
        ) : (
          <p className="text-red-400 text-xl">للأسف لم تحصل على شيء</p>
        )}
        <button
          onClick={() => window.location.reload()}
          className="mt-6 cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-xl font-semibold shadow-lg transition"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  if (isWin) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center bg-gradient-to-b from-black to-blue-950 text-white px-4">
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="text-4xl font-bold mb-4 text-yellow-400"
        >
          مبروك! لقد حصلت على المليون!
        </motion.h1>
        <p className="text-2xl">
          لقد فزت بمبلغ:
          <span className="text-green-400 font-bold ms-2">
            {prizes[gameQuestions.length - 1]}₪
          </span>
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 cursor-pointer bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl font-semibold shadow-lg transition"
        >
          العب مرة أخرى
        </button>
      </div>
    );
  }

  // الواجهة الأساسية أثناء اللعب
  return (
    <div className="relative min-h-screen flex flex-col md:flex-row bg-gradient-to-b from-black via-blue-950 to-black text-white font-[Cairo] overflow-hidden">
      {/* زر ملء الشاشة */}
      <button
        onClick={handleFullScreen}
        className="absolute cursor-pointer top-4 end-4 text-sm bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded-lg shadow-md transition"
      >
        ملء الشاشة
      </button>

      {/* شريط الجوائز */}
      <PrizeLadder prizes={prizes} currentIndex={currentQuestionIndex} />

      {/* القسم الرئيسي */}
      <div className="flex flex-col flex-1 items-center justify-center gap-6 px-4 md:ms-64 ms-16">
        <Lifelines lifelines={lifelines} onUse={handleUseLifline} />

        <Timer
          isPaused={isCurrentQuestionAnswered}
          key={currentQuestion.id}
          duration={30}
          onTimeOut={() => {
            // playSound("timeout");
            // handleAnswer(null);
          }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-3xl"
          >
            <QuestionCard
              question={currentQuestion}
              selectedAnswer={selectedAnswer}
              isCurrentQuestionAnswered={isCurrentQuestionAnswered}
              onSelectAnswer={(answer) => {
                // playSound("select");
                handleAnswer(answer);
              }}
              lifelines={lifelines}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
