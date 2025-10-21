import { useState } from "react";
import QuestionCard from "../components/game/QuestionCard";
import PrizeLadder from "../components/game/PrizeLadder";
import Lifelines from "../components/game/Lifelines";
import questionsData from "../data/questions.json";
import Timer from "../components/game/Timer";
import { getRandomFromArray, handleFullScreen } from "../lib/helper";
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
      <div className="relative flex flex-col gap-4 items-center justify-center h-screen text-center overflow-hidden">
        {/* النص الرئيسي */}
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 8, stiffness: 100 }}
          className="text-5xl sm:text-6xl font-extrabold  text-red-500 drop-shadow-[0_0_30px_rgba(255,0,0,0.4)]"
        >
          انتهت اللعبة
        </motion.h1>

        {/* نص النتيجة */}
        {currentQuestionIndex > 0 ? (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-2xl sm:text-3xl font-medium text-gray-200"
          >
            لقد فزت بمبلغ
            <span className="text-yellow-400 font-bold mx-2 drop-shadow-[0_0_10px_rgba(255,255,0,0.6)]">
              {prizes[currentQuestionIndex - 1]}$
            </span>
            👏
          </motion.p>
        ) : (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl sm:text-2xl text-red-400"
          >
            للأسف 😞 لم تحصل على شيء
          </motion.p>
        )}

        {/* زر إعادة المحاولة */}
        <motion.button
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          onClick={() => window.location.reload()}
          className="relative cursor-pointer bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 text-black px-8 py-3 rounded-full font-semibold text-lg shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,0,0.6)]"
        >
          🔁 إعادة المحاولة
        </motion.button>
      </div>
    );
  }


  if (isWin) {
    return (
      <div className="relative flex flex-col items-center justify-center h-screen text-center bg-gradient-to-b from-[#000000] to-[#001b3f] text-white overflow-hidden">
        <motion.h1
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
          className="text-5xl font-extrabold mb-4 text-yellow-400 drop-shadow-[0_0_25px_rgba(255,255,0,0.8)]"
        >
          🏆 مبروك! لقد حصلت على المليون!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-2xl"
        >
          لقد فزت بمبلغ:
          <span className="text-green-400 font-bold ms-2 drop-shadow-[0_0_10px_rgba(0,255,0,0.7)]">
            {prizes[gameQuestions.length - 1]}₪
          </span>
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          onClick={() => window.location.reload()}
          className="mt-10 cursor-pointer bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-[0_0_25px_rgba(0,255,0,0.5)] transition-all hover:scale-110"
        >
          🎮 العب مرة أخرى
        </motion.button>
      </div>
    );
  }

  // الواجهة الأساسية أثناء اللعب
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1}}
      transition={{ delay: .3,duration:.5,ease:"easeInOut" }}
      className="relative mb-8 min-h-screen flex flex-col md:flex-row font-[Cairo] overflow-hidden">
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
            handleAnswer(null);
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
    </motion.div>
  );
}
