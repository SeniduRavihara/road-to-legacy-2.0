"use client";

import { useEffect, useState } from "react";

export default function SlidingPuzzle() {
  // Game grid size
  const SIZE = 4;

  // Types for TypeScript
  type PuzzleGrid = number[][];
  type Position = { row: number; col: number };

  // Puzzle state (numbers 1-15 and 0 for empty)
  const [puzzle, setPuzzle] = useState<PuzzleGrid>([]);

  // Position of the empty tile
  const [emptyPos, setEmptyPos] = useState<Position>({ row: 3, col: 3 });

  // Move counter
  const [moves, setMoves] = useState<number>(0);

  // Game state
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  // Initialize puzzle on first load
  useEffect(() => {
    initializePuzzle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Check if puzzle is solved
  const checkWin = (board: PuzzleGrid): boolean => {
    // The solved state has numbers 1-15 in order, followed by empty (0)
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        const expectedValue = i * SIZE + j + 1;
        // Skip the last cell which should be empty (0)
        if (i === SIZE - 1 && j === SIZE - 1) continue;
        if (board[i][j] !== expectedValue) {
          return false;
        }
      }
    }
    return true;
  };

  // Initialize a specific solvable puzzle configuration
  const initializePuzzle = (): void => {
    // This is a guaranteed solvable configuration
    // It has an even number of inversions + row of empty space from bottom
    const solvablePuzzle: PuzzleGrid = [
      [5, 10, 1, 3],
      [2, 15, 12, 6],
      [13, 11, 9, 8],
      [14, 7, 4, 0],
    ];

    // Empty tile position
    const emptyTilePos: Position = { row: 3, col: 3 };

    setPuzzle(solvablePuzzle);
    setEmptyPos(emptyTilePos);
    setMoves(0);
    setGameWon(false);
    setMessage("");
  };

  // Handle tile click
  const handleTileClick = (row: number, col: number): void => {
    if (gameWon) return;

    // Check if the clicked tile is adjacent to the empty space
    const isAdjacent =
      (Math.abs(row - emptyPos.row) === 1 && col === emptyPos.col) ||
      (Math.abs(col - emptyPos.col) === 1 && row === emptyPos.row);

    if (isAdjacent) {
      // Create a new puzzle with the move applied
      const newPuzzle = puzzle.map((row) => [...row]);
      newPuzzle[emptyPos.row][emptyPos.col] = newPuzzle[row][col];
      newPuzzle[row][col] = 0;

      // Update state
      setPuzzle(newPuzzle);
      setEmptyPos({ row, col });
      setMoves(moves + 1);

      // Check if the puzzle is solved
      if (checkWin(newPuzzle)) {
        setGameWon(true);
        setMessage(
          `Congratulations! You solved the puzzle in ${moves + 1} moves!`
        );
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 max-w-md mx-auto bg-gray-900 text-gray-100 rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-100">15-Puzzle</h1>

      {gameWon && (
        <div className="mb-4 p-2 bg-green-900 text-green-100 rounded">
          {message}
        </div>
      )}

      <div className="mb-4 text-gray-300">Moves: {moves}</div>

      <div className="grid grid-cols-4 gap-1 bg-gray-700 p-1 border border-gray-600 mb-4">
        {puzzle.map((row, rowIndex) =>
          row.map((num, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleTileClick(rowIndex, colIndex)}
              className={`w-16 h-16 flex items-center justify-center text-xl font-bold rounded cursor-pointer 
                ${num === 0 ? "bg-gray-800 invisible" : "bg-gray-800 hover:bg-gray-700"}`}
            >
              {num !== 0 && num}
            </div>
          ))
        )}
      </div>

      <div className="text-sm text-gray-400">
        <p>Slide the tiles to arrange the numbers from 1 to 15 in order.</p>
      </div>
    </div>
  );
}
