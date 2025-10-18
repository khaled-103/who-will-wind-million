import GameRules from "../components/home/GameRules"
import Header from "../components/home/Header"
import PrimaryButton from "../components/ui/PrimaryButton"

function Home() {
    function handleStartGame() {
        console.log("game start");
    }
    return (
       <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-millionaire-dark via-millionaire-mid to-millionaire-light p-4">
      <div className="max-w-2xl w-full space-y-6 p-8 rounded-3xl shadow-[0_0_40px_rgba(255,215,0,0.3)]">
                <Header />
                <GameRules />
                <PrimaryButton onClick={handleStartGame} className="w-full">
                    ابدأ اللعبة 🚀
                </PrimaryButton>
                {/* <PlayerForm onStart={handleStart} /> */}
            </div>

            <footer className="mt-10 text-sm text-millionaire-gold/80">
                © {new Date().getFullYear()} — محاكاة تعليمية لأغراض التمرين
            </footer>
        </main>
    )
}

export default Home
