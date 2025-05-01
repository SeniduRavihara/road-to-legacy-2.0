"use client";

import SudokuGame from "@/components/games/SudokuGame";
import WordPuzzle from "@/components/games/WordPuzzle";
import { setGameResultsApi } from "@/firebase/api";
import { db } from "@/firebase/config";
import { useData } from "@/hooks/useData";
import { GameResult, TeamDataType } from "@/types";
import { doc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Define types for game structure
interface Game {
  id: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
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

  const [currentGameIndex, setCurrentGameIndex] = useState<number>(0);
  const [gameState, setGameState] = useState<
    "waiting" | "countdown" | "playing" | "finished" | "submitting"
  >("waiting");

  const [totalTimeTaken, setTotalTimeTaken] = useState<number>(0);

  const [countdownTime, setCountdownTime] = useState<number>(3); // 3 seconds countdown
  const [gameStartTime, setGameStartTime] = useState<number | undefined>(
    options?.gameStartTime
      ? options.gameStartTime.getTime() // subtract 5 minutes
      : undefined
  );

  const [gameResults, setGameResults] = useState<GameResult[]>([]);
  const [allGamesCompleted, setAllGamesCompleted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(Date.now());

  const [teamName, setTeamName] = useState<string | null>(null);

  console.log(allGamesCompleted);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!params.get("team")) {
      router.push("/");
    }
    setTeamName(params.get("team") || "");
  }, [router, teamName]);

  // Load team data from Firebase and set the proper game state
  useEffect(() => {
    if (!teamName) return;
    const documentRef = doc(db, "teams", teamName);

    const unsubscribe = onSnapshot(documentRef, (documentSnapshot) => {
      if (documentSnapshot.exists()) {
        const data = documentSnapshot.data() as TeamDataType;

        if (data.totalTimeTaken !== undefined) {
          // Make sure we're getting a valid number
          const parsedTotalTime =
            typeof data.totalTimeTaken === "number" ? data.totalTimeTaken : 0;
          setTotalTimeTaken(parsedTotalTime);
        }

        if (
          data.gameResults &&
          Array.isArray(data.gameResults) &&
          data.gameResults.length > 0
        ) {
          // Validate game results before setting
          const validatedResults = data.gameResults.map((result) => ({
            ...result,
            timeInMs: typeof result.timeInMs === "number" ? result.timeInMs : 0,
            formattedTime: result.formattedTime || "0:00.00",
          }));

          setGameResults(validatedResults);

          // Set the current game index to the NEXT game after the last completed one
          const nextGameIndex = validatedResults.length;

          // If all games completed, set to finished state
          if (nextGameIndex >= GAMES.length) {
            setAllGamesCompleted(true);
            setGameState("finished");
          } else {
            // Otherwise, prepare to play the next game
            setCurrentGameIndex(nextGameIndex);
            // For games after the first one, we can go directly to playing state
            if (nextGameIndex > 0) {
              setGameState("playing");
              setGameStartTime(Date.now()); // Start timing immediately
            }
            // For the first game, we maintain the waiting/countdown logic
          }
        }
      } else {
        console.log("Document does not exist.");
      }
    });
    return unsubscribe;
  }, [teamName]);

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
        now >= gameStartTime - 5 * 60 * 1000 && // 5 minutes before gameStartTime
        gameResults.length === 0 // Make sure we haven't already played games
      ) {
        setGameState("countdown");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, gameStartTime, currentGameIndex, gameResults]);

  // Handle countdown timer for first game only
  useEffect(() => {
    if (gameState === "countdown" && countdownTime > 0) {
      const timer = setTimeout(() => {
        setCountdownTime(countdownTime - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (gameState === "countdown" && countdownTime === 0) {
      setGameState("playing");
      setTotalTimeTaken(0);
      setGameStartTime(Date.now());
    }
  }, [gameState, countdownTime]);

  // Handle game completion
  const handleGameComplete = async () => {
    if (!teamName) return;

    // Calculate time taken
    const endTime = Date.now();
    const timeTaken = gameStartTime ? endTime - gameStartTime : 0;
    const minutes = Math.floor(timeTaken / 60000);
    const secondsNum = (timeTaken % 60000) / 1000;
    const seconds = secondsNum.toFixed(2);

    // Format time properly
    const formattedTime = `${minutes}:${secondsNum < 10 ? "0" : ""}${seconds}`;

    // Store result
    const result: GameResult = {
      gameId: GAMES[currentGameIndex].id,
      gameName: GAMES[currentGameIndex].name,
      timeInMs: timeTaken,
      formattedTime: formattedTime,
    };

    const newTotalTime = totalTimeTaken + timeTaken;
    setTotalTimeTaken(newTotalTime);

    // Save to results
    const newResults = [...gameResults, result];
    setGameResults(newResults);

    setGameState("submitting");

    // Save to Firebase first
    try {
      await setGameResultsApi(teamName, newResults, newTotalTime);

      // After successful save, check if we're done or move to next game
      if (currentGameIndex < GAMES.length - 1) {
        // Move to next game
        setCurrentGameIndex(currentGameIndex + 1);
        setGameState("playing");
        setGameStartTime(Date.now()); // Start timing immediately
      } else {
        // All games completed
        setAllGamesCompleted(true);
        setGameState("finished");
      }
    } catch (error) {
      console.error("Error saving game results:", error);
      // On error, stay in the same game to let the user try again
      setGameState("playing");
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

  // Get Current game component
  const CurrentGame =
    currentGameIndex < GAMES.length ? GAMES[currentGameIndex].component : null;

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
              {currentGameIndex < GAMES.length
                ? GAMES[currentGameIndex].name
                : "All Completed"}
            </div>
          </div>
        </header>

        {/* Game Progress Tracker */}
        <div className="mb-6">
          <div className="w-full bg-[#2c3039] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#191b1f] h-full"
              style={{
                width: `${(Math.min(currentGameIndex, GAMES.length - 1) / (GAMES.length - 1)) * 100}%`,
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
                Prepare for:{" "}
                {currentGameIndex < GAMES.length
                  ? GAMES[currentGameIndex].name
                  : ""}
              </p>
            </div>
          )}

          {/* Game */}
          {gameState === "playing" && CurrentGame && (
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

          {gameState === "submitting" && (
            <div className="flex flex-col items-center justify-center py-24">
              <h2 className="text-2xl mb-4 text-[#f2f2f7]">
                Submitting Results
              </h2>
              <p className="text-[#f2f2f7]">
                Please wait while we submit your results.
              </p>
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
                            // Get total milliseconds
                            const totalMs = gameResults.reduce(
                              (sum, result) => sum + (result.timeInMs || 0),
                              0
                            );

                            // Format correctly
                            const totalMinutes = Math.floor(totalMs / 60000);
                            const totalSecondsNum = Math.floor(
                              (totalMs % 60000) / 1000
                            );
                            const totalMilliseconds = Math.floor(
                              (totalMs % 1000) / 10
                            );

                            return `${totalMinutes}:${totalSecondsNum < 10 ? "0" : ""}${totalSecondsNum}.${totalMilliseconds < 10 ? "0" : ""}${totalMilliseconds}`;
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
