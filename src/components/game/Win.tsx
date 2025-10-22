import {motion} from "framer-motion";
export default function Win({amount,handleNextRound}:{amount:number,handleNextRound:()=>void}) {
    return(
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
                        {amount}$
                    </span>
                </motion.p>

                <motion.button
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    onClick={handleNextRound}
                    className="mt-10 cursor-pointer bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-[0_0_25px_rgba(0,255,0,0.5)] transition-all hover:scale-110"
                >
                    🎮 العب مرة أخرى
                </motion.button>
            </div>
    );
}