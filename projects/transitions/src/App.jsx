import Score from "./Score";
import useScore from "./useScore";

export default function App() {
  const { game, setGame, score, isPending } = useScore();

  function handleSelectChange(event) {
    setGame(event.target.value);
  }

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
