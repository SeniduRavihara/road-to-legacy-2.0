"use client";

import { useEffect, useState } from "react";

export default function SlidingPuzzle() {
  // Game grid size
  const SIZE = 4;

  // Puzzle state (numbers 1-15 and 0 for empty)
  const [puzzle, setPuzzle] = useState([]);

  // Position of the empty tile
  const [emptyPos, setEmptyPos] = useState({ row: SIZE - 1, col: SIZE - 1 });

  // Move counter
  const [moves, setMoves] = useState(0);

  // Game state
  const [gameWon, setGameWon] = useState(false);
  const [message, setMessage] = useState("");

  // Initialize puzzle on first load
  useEffect(() => {
    initializePuzzle();
  }, []);

  // Check if puzzle is solved
  const checkWin = (board) => {
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

  // Shuffle the puzzle (Fisher-Yates shuffle)
  const shufflePuzzle = () => {
    // Create solved puzzle first
    const numbers = Array.from({ length: SIZE * SIZE - 1 }, (_, i) => i + 1);
    numbers.push(0); // Add empty space

    // Shuffle
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    // Convert to 2D grid
    const newPuzzle = [];
    let emptyRow = 0;
    let emptyCol = 0;

    for (let i = 0; i < SIZE; i++) {
      const row = [];
      for (let j = 0; j < SIZE; j++) {
        const value = numbers[i * SIZE + j];
        row.push(value);
        if (value === 0) {
          emptyRow = i;
          emptyCol = j;
        }
      }
      newPuzzle.push(row);
    }

    // Make sure the puzzle is solvable
    // For 4x4 puzzles, if the number of inversions + row of empty square is odd,
    // the puzzle is unsolvable, so we make an additional swap if needed
    const inversions = countInversions(numbers);
    const parity = (inversions + emptyRow) % 2;

    if (parity !== 0) {
      // Swap two adjacent non-empty tiles to make it solvable
      let pos1 = 0;
      let pos2 = 1;

      // Find two adjacent numbers to swap
      while (numbers[pos1] === 0 || numbers[pos2] === 0) {
        pos1++;
        pos2 = pos1 + 1;
        if (pos2 >= numbers.length) {
          pos1 = 0;
          pos2 = 1;
        }
      }

      // Get their positions in the grid
      const row1 = Math.floor(pos1 / SIZE);
      const col1 = pos1 % SIZE;
      const row2 = Math.floor(pos2 / SIZE);
      const col2 = pos2 % SIZE;

      // Swap them
      [newPuzzle[row1][col1], newPuzzle[row2][col2]] = [
        newPuzzle[row2][col2],
        newPuzzle[row1][col1],
      ];
    }

    return { puzzle: newPuzzle, emptyPos: { row: emptyRow, col: emptyCol } };
  };

  // Count inversions in the puzzle (required to check if puzzle is solvable)
  const countInversions = (numbers) => {
    const puzzleWithoutEmpty = numbers.filter((num) => num !== 0);
    let inversions = 0;

    for (let i = 0; i < puzzleWithoutEmpty.length; i++) {
      for (let j = i + 1; j < puzzleWithoutEmpty.length; j++) {
        if (puzzleWithoutEmpty[i] > puzzleWithoutEmpty[j]) {
          inversions++;
        }
      }
    }

    return inversions;
  };

  // Initialize new puzzle
  const initializePuzzle = () => {
    const { puzzle: newPuzzle, emptyPos: newEmptyPos } = shufflePuzzle();
    setPuzzle(newPuzzle);
    setEmptyPos(newEmptyPos);
    setMoves(0);
    setGameWon(false);
    setMessage("");
  };

  // Handle tile click
  const handleTileClick = (row, col) => {
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

      <div className="flex gap-2 mb-4">
        <button
          onClick={initializePuzzle}
          className="px-4 py-2 bg-emerald-700 text-gray-100 rounded hover:bg-emerald-600"
        >
          New Game
        </button>
      </div>

      <div className="text-sm text-gray-400">
        <p>Slide the tiles to arrange the numbers from 1 to 15 in order.</p>
      </div>
    </div>
  );
}
