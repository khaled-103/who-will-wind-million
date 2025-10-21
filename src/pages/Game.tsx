import { useState } from "react";
import GameHolder from "../components/game/GameHolder";
import { getRandomFromArray } from "../lib/helper";
import questionsData from "../data/questions.json";


export default function Game() {
  console.log("game re render");
  const [round, setRound] = useState(0);
  const [gameQuestions, setQameQuestions] = useState(() => getRandomFromArray(questionsData, 15));

  function handeNextRound() {
    setRound(prev => prev + 1);
    setQameQuestions(getRandomFromArray(questionsData, 15));
  }
  return (
    <>
      <GameHolder gameQuestions={gameQuestions} key={round} handelNextRound={handeNextRound} />
    </>
  );
}
