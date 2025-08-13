import { useEffect, useState } from "react";

async function getScore(game) {
  const response = await fetch("/score?game=" + game);
  const score = await response.json();
  return score;
}

export default function useScore() {
  const [isPending, setIsPending] = useState(true);
  const [game, setGame] = useState(1);
  const [score, setScore] = useState({ home: "-", away: "-" });

  useEffect(() => {
    async function getNewScore() {
      setIsPending(true);
      setGame(game);
      const newScore = await getScore(game);
      setScore(newScore);
      setIsPending(false);
    }

    getNewScore();
  }, [game]);

  return { game, setGame, score, isPending };
}
