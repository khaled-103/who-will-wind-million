import {motion} from "framer-motion";
export default function GameOver({currentQuestionIndex,amount,handleNextRound}:{currentQuestionIndex:number,amount:number,handleNextRound:()=>void}) {
    return(
        <>
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
                            {amount}$
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
                    onClick={handleNextRound}
                    className="relative cursor-pointer bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 text-black px-8 py-3 rounded-full font-semibold text-lg shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,0,0.6)]"
                >
                    🔁 إعادة المحاولة
                </motion.button>
            </div></>
    );
}