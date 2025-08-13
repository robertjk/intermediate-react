import { useEffect, useState } from "react";

import Score from "./Score";
import getScore from "./getScore";

export default function App() {
  const [isPending, setIsPending] = useState(true);
  const [game, setGame] = useState(1);
  const [score, setScore] = useState({ home: "-", away: "-" });

  async function getNewScore(game) {
    setIsPending(true);
    setGame(game);
    const newScore = await getScore(game);
    setScore(newScore);
    setIsPending(false);
  }

  function handleSelectChange(event) {
    setGame(event.target.value);
  }

  useEffect(() => {
    getNewScore(game);
  }, [game]);

  return (
    <div className="app">
      <h1>Game {game}</h1>
      <select disabled={isPending} onChange={handleSelectChange}>
        {[1, 2, 3, 4, 5, 6, 7].map((gameId) => (
          <option key={gameId} value={gameId}>
            Game {gameId}
          </option>
        ))}
      </select>
      <div className={`loading-container ${isPending ? "loading" : ""}`}>
        {" "}
        <span className="spinner">🌀</span>
      </div>
      <Score
        isPending={isPending}
        home={score.home}
        homeImage={score.homeImage}
        homeName={score.homeName}
        away={score.away}
        awayImage={score.awayImage}
        awayName={score.awayName}
      />
    </div>
  );
}
