import { Link } from "react-router"
import GameRules from "../components/home/GameRules"
import Header from "../components/home/Header"
import PrimaryButton from "../components/ui/PrimaryButton"

function Home() {

    function handleStartGame() {

    }
    return (
        <main className="min-h-screen flex flex-col items-center justify-center  p-4">
            <div className="max-w-2xl w-full space-y-6 p-8 rounded-3xl bg-gradient-to-b from-gray-900 to-blue-950 border border-yellow-500 shadow-2xl">
                <Header />
                <GameRules />
                <PrimaryButton onClick={handleStartGame} className="w-full">
                    <Link to="/new-game">
                        ابدأ اللعبة 🚀
                    </Link>
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
