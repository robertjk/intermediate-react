import { startTransition, useEffect, useState, useTransition } from "react";

async function getScore(game) {
  const response = await fetch("/score?game=" + game);
  const score = await response.json();
  return score;
}

export default function useScore() {
  const [isPending, startTransition] = useTransition(true);
  const [game, setGame] = useState(1);
  const [score, setScore] = useState({ home: "-", away: "-" });

  useEffect(() => {
    async function getNewScore() {
      setGame(game);
      startTransition(async () => {
        const newScore = await getScore(game);
        startTransition(() => {
          setScore(newScore);
        });
      });
    }

    getNewScore();
  }, [game]);

  return { game, setGame, score, isPending };
}
