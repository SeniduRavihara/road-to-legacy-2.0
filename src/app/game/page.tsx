"use client";

import SudokuGame from "@/components/games/SudokuGame";
import WordPuzzle from "@/components/games/WordPuzzle";
import { useData } from "@/hooks/useData";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Define types for game structure
interface Game {
  id: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
}

// Define game result interface
interface GameResult {
  gameId: string;
  gameName: string;
  timeInMs: number;
  formattedTime: string;
}

// Define options from Firebase or other data sources
interface GameOptions {
  gameStartTime?: Date;
}

const GAMES: Game[] = [
  { id: "sudoku", name: "Sudoku Puzzle", component: SudokuGame },
  { id: "wordpuzzle", name: "Tech Crossword", component: WordPuzzle },
  // Add a third game here when confirmed
  { id: "sudoku2", name: "Advanced Sudoku", component: SudokuGame }, // Placeholder for third game
];

const GamePage: React.FC = () => {
  const router = useRouter();

  const { options } = useData() as { options?: GameOptions };

  const searchParams = useSearchParams();
  const teamName = searchParams.get("team");

  const [currentGameIndex, setCurrentGameIndex] = useState<number>(0);
  const [gameState, setGameState] = useState<
    "waiting" | "countdown" | "playing" | "finished"
  >("waiting");
  const [countdownTime, setCountdownTime] = useState<number>(5 * 60); // 5 minutes countdown (in seconds)
  const [gameStartTime, setGameStartTime] = useState<number | undefined>(
    options?.gameStartTime ? options.gameStartTime.getTime() : undefined
  );
  const [gameResults, setGameResults] = useState<GameResult[]>([]);
  const [allGamesCompleted, setAllGamesCompleted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(Date.now());

  // Redirect if no team name is provided
  useEffect(() => {
    if (!teamName) {
      router.push("/");
    }
  }, [teamName, router]);

  // Initialize gameStartTime from Date object
  useEffect(() => {
    if (options?.gameStartTime) {
      // Handle JavaScript Date object
      const timestampValue = options.gameStartTime.getTime();
      setGameStartTime(timestampValue);
    }
  }, [options]);

  // Check if it's time to start the countdown for the first game
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      setCurrentTime(now);

      // Only for the first game, we check against gameStartTime from options
      if (
        currentGameIndex === 0 &&
        gameState === "waiting" &&
        gameStartTime &&
        now >= gameStartTime
      ) {
        setGameState("countdown");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, gameStartTime, currentGameIndex]);

  // Handle countdown timer for first game only
  useEffect(() => {
    if (gameState === "countdown" && countdownTime > 0) {
      const timer = setTimeout(() => {
        setCountdownTime(countdownTime - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (gameState === "countdown" && countdownTime === 0) {
      setGameState("playing");
      setGameStartTime(Date.now());
    }
  }, [gameState, countdownTime]);

  // Handle game completion
  const handleGameComplete = (): void => {
    // Calculate time taken
    const endTime = Date.now();
    const timeTaken = gameStartTime ? endTime - gameStartTime : 0;
    const minutes = Math.floor(timeTaken / 60000);
    const secondsNum = (timeTaken % 60000) / 1000;
    const seconds = secondsNum.toFixed(2);

    // Store result
    const result: GameResult = {
      gameId: GAMES[currentGameIndex].id,
      gameName: GAMES[currentGameIndex].name,
      timeInMs: timeTaken,
      formattedTime: `${minutes}:${secondsNum < 10 ? "0" : ""}${seconds}`,
    };

    // Save to results
    setGameResults([...gameResults, result]);

    // In a real app, you'd submit this to your backend
    console.log(
      `Game completed: ${GAMES[currentGameIndex].name} in ${result.formattedTime}`
    );

    // Move to next game or finish
    if (currentGameIndex < GAMES.length - 1) {
      // For games after the first, go straight to playing
      setCurrentGameIndex(currentGameIndex + 1);
      setGameState("playing");
      setGameStartTime(Date.now()); // Start timing immediately
    } else {
      setAllGamesCompleted(true);
      setGameState("finished");
    }
  };

  // Format the countdown time for display
  const formatCountdown = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Format the time until start
  const formatTimeUntilStart = (milliseconds: number): string => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes > 0) {
      return `${minutes} minute${minutes !== 1 ? "s" : ""} and ${remainingSeconds} second${remainingSeconds !== 1 ? "s" : ""}`;
    } else {
      return `${remainingSeconds} second${remainingSeconds !== 1 ? "s" : ""}`;
    }
  };

  // Current game component
  const CurrentGame = GAMES[currentGameIndex].component;

  if (!teamName) {
    return (
      <div className="min-h-screen bg-[#262930] flex items-center justify-center">
        Redirecting...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#262930] p-4">
      <div className="max-w-6xl mx-auto">
        <header className="bg-[#2c3039] rounded-lg p-4 mb-4 shadow-lg flex justify-between items-center">
          <h1 className="text-xl font-bold text-[#f2f2f7]">Team: {teamName}</h1>
          <div className="flex items-center space-x-4">
            <div className="text-[#f2f2f7] text-sm">
              Game {currentGameIndex + 1} of {GAMES.length}
            </div>
            <div className="px-3 py-1 bg-[#191b1f] text-[#f2f2f7] rounded-md">
              {GAMES[currentGameIndex].name}
            </div>
          </div>
        </header>

        {/* Game Progress Tracker */}
        <div className="mb-6">
          <div className="w-full bg-[#2c3039] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#191b1f] h-full"
              style={{
                width: `${(currentGameIndex / (GAMES.length - 1)) * 100}%`,
              }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-[#f2f2f7] px-1">
            {GAMES.map((game, index) => (
              <div
                key={game.id}
                className={`font-medium ${index <= currentGameIndex ? "text-[#f2f2f7]" : "text-gray-500"}`}
              >
                {game.name}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-[#2c3039] rounded-lg p-6 shadow-lg">
          {/* Waiting State - Only for first game */}
          {gameState === "waiting" && (
            <div className="flex flex-col items-center justify-center py-24">
              <h2 className="text-2xl mb-4 text-[#f2f2f7]">
                Waiting for Start Time
              </h2>
              <p className="text-[#f2f2f7]">
                The game will begin automatically at the scheduled time.
              </p>
              {gameStartTime && (
                <div className="mt-4 text-[#f2f2f7]">
                  {gameStartTime > currentTime ? (
                    <>
                      Time until start:{" "}
                      {formatTimeUntilStart(gameStartTime - currentTime)}
                    </>
                  ) : (
                    <>Game should start momentarily...</>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Countdown - Only for first game */}
          {gameState === "countdown" && (
            <div className="flex flex-col items-center justify-center py-24">
              <h2 className="text-2xl mb-4 text-[#f2f2f7]">Get Ready!</h2>
              <div className="text-6xl font-bold text-[#f2f2f7]">
                {formatCountdown(countdownTime)}
              </div>
              <p className="mt-4 text-[#f2f2f7]">
                Prepare for: {GAMES[currentGameIndex].name}
              </p>
            </div>
          )}

          {/* Game */}
          {gameState === "playing" && (
            <div>
              <div className="mb-4 flex justify-between items-center">
                <div className="text-[#f2f2f7]">
                  Current Game:{" "}
                  <span className="font-bold">
                    {GAMES[currentGameIndex].name}
                  </span>
                </div>
                <button
                  onClick={handleGameComplete}
                  className="bg-[#191b1f] text-[#f2f2f7] px-4 py-2 rounded-md hover:bg-opacity-90 transition"
                >
                  Finish Game
                </button>
              </div>
              <div className="game-container">
                <CurrentGame />
              </div>
            </div>
          )}

          {/* Results */}
          {gameState === "finished" && (
            <div className="py-6">
              <h2 className="text-2xl font-bold text-center mb-6 text-[#f2f2f7]">
                All Games Completed!
              </h2>
              <div className="max-w-md mx-auto">
                <div className="bg-[#333842] rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-medium text-[#f2f2f7] mb-3">
                    Game Results
                  </h3>
                  <table className="w-full text-[#f2f2f7]">
                    <thead>
                      <tr className="border-b border-[#2c3039]">
                        <th className="text-left pb-2">Game</th>
                        <th className="text-right pb-2">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gameResults.map((result, index) => (
                        <tr key={index} className="border-b border-[#2c3039]">
                          <td className="py-2">{result.gameName}</td>
                          <td className="py-2 text-right font-mono">
                            {result.formattedTime}
                          </td>
                        </tr>
                      ))}
                      <tr className="font-bold">
                        <td className="pt-3">Total</td>
                        <td className="pt-3 text-right font-mono">
                          {(() => {
                            const totalMs = gameResults.reduce(
                              (sum, result) => sum + result.timeInMs,
                              0
                            );
                            const totalMinutes = Math.floor(totalMs / 60000);
                            const totalSecondsNum = (totalMs % 60000) / 1000;
                            const totalSeconds = totalSecondsNum.toFixed(2);
                            return `${totalMinutes}:${totalSecondsNum < 10 ? "0" : ""}${totalSeconds}`;
                          })()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => router.push("/")}
                    className="bg-[#191b1f] text-[#f2f2f7] px-6 py-3 rounded-md hover:bg-opacity-90 transition"
                  >
                    Return to Home
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Previous Results */}
        {gameResults.length > 0 && gameState !== "finished" && (
          <div className="mt-6 bg-[#2c3039] rounded-lg p-4 shadow-lg">
            <h3 className="text-lg font-medium text-[#f2f2f7] mb-3">
              Previous Results
            </h3>
            <table className="w-full text-[#f2f2f7]">
              <thead>
                <tr className="border-b border-[#333842]">
                  <th className="text-left pb-2">Game</th>
                  <th className="text-right pb-2">Time</th>
                </tr>
              </thead>
              <tbody>
                {gameResults.map((result, index) => (
                  <tr key={index} className="border-b border-[#333842]">
                    <td className="py-2">{result.gameName}</td>
                    <td className="py-2 text-right font-mono">
                      {result.formattedTime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamePage;
