"use client";

import { useEffect, useState } from "react";

export default function SudokuGame() {
  // Initial puzzle state (0 represents empty cells)
  const [puzzle, setPuzzle] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  // Locked cells (cells that cannot be edited)
  const [locked, setLocked] = useState([
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
  ]);

  // Game state
  const [gameWon, setGameWon] = useState(false);
  const [message, setMessage] = useState("");

  // Generate a new puzzle on first load
  useEffect(() => {
    generateNewPuzzle();
  }, []);

  // Check if the puzzle is solved correctly
  const checkSolution = () => {
    // Check rows
    for (let i = 0; i < 4; i++) {
      const rowSet = new Set();
      for (let j = 0; j < 4; j++) {
        if (puzzle[i][j] === 0 || rowSet.has(puzzle[i][j])) {
          return false;
        }
        rowSet.add(puzzle[i][j]);
      }
    }

    // Check columns
    for (let j = 0; j < 4; j++) {
      const colSet = new Set();
      for (let i = 0; i < 4; i++) {
        if (puzzle[i][j] === 0 || colSet.has(puzzle[i][j])) {
          return false;
        }
        colSet.add(puzzle[i][j]);
      }
    }

    // Check 2x2 subgrids
    for (let blockRow = 0; blockRow < 2; blockRow++) {
      for (let blockCol = 0; blockCol < 2; blockCol++) {
        const blockSet = new Set();
        for (let i = 0; i < 2; i++) {
          for (let j = 0; j < 2; j++) {
            const row = blockRow * 2 + i;
            const col = blockCol * 2 + j;
            if (puzzle[row][col] === 0 || blockSet.has(puzzle[row][col])) {
              return false;
            }
            blockSet.add(puzzle[row][col]);
          }
        }
      }
    }

    return true;
  };

  // Generate a solved puzzle
  const generateSolvedPuzzle = () => {
    const solved = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    // Fill the grid with a valid solution
    // First row is random
    const firstRow = [1, 2, 3, 4].sort(() => Math.random() - 0.5);
    solved[0] = [...firstRow];

    // Second row - shift by 2
    solved[1][0] = solved[0][2];
    solved[1][1] = solved[0][3];
    solved[1][2] = solved[0][0];
    solved[1][3] = solved[0][1];

    // Third row - shift by 1
    solved[2][0] = solved[0][1];
    solved[2][1] = solved[0][0];
    solved[2][2] = solved[0][3];
    solved[2][3] = solved[0][2];

    // Fourth row - shift by 3
    solved[3][0] = solved[0][3];
    solved[3][1] = solved[0][2];
    solved[3][2] = solved[0][1];
    solved[3][3] = solved[0][0];

    return solved;
  };

  // Generate a new puzzle by removing some numbers from a solved puzzle
  const generateNewPuzzle = () => {
    const solved = generateSolvedPuzzle();
    const newPuzzle = solved.map((row) => [...row]);
    const newLocked = locked.map((row) => row.map(() => true));

    // Remove some numbers (leaving only 6-8 numbers)
    const emptyCells = 10; // Remove 10 numbers from the 16 cells
    let count = 0;

    while (count < emptyCells) {
      const row = Math.floor(Math.random() * 4);
      const col = Math.floor(Math.random() * 4);

      if (newPuzzle[row][col] !== 0) {
        newPuzzle[row][col] = 0;
        newLocked[row][col] = false;
        count++;
      }
    }

    setPuzzle(newPuzzle);
    setLocked(newLocked);
    setGameWon(false);
    setMessage("");
  };

  // Handle cell value change
  const handleCellChange = (row, col, value) => {
    if (locked[row][col]) return;

    const newValue = value === "" ? 0 : parseInt(value);

    // Check if input is valid
    if (isNaN(newValue) || newValue < 1 || newValue > 4) {
      return;
    }

    const newPuzzle = puzzle.map((r, i) =>
      r.map((c, j) => (i === row && j === col ? newValue : c))
    );

    setPuzzle(newPuzzle);

    // Check if puzzle is solved
    if (checkSolution()) {
      setGameWon(true);
      setMessage("Congratulations! You solved the puzzle!");
    }
  };

  // Check if there are any mistakes
  const checkMistakes = () => {
    // Create a copy of the puzzle
    const tempPuzzle = puzzle.map((row) => [...row]);

    // Check if any filled cell violates Sudoku rules
    let mistakes = false;

    // Check rows
    for (let i = 0; i < 4; i++) {
      const rowValues = {};
      for (let j = 0; j < 4; j++) {
        if (tempPuzzle[i][j] !== 0) {
          if (rowValues[tempPuzzle[i][j]]) {
            mistakes = true;
            break;
          }
          rowValues[tempPuzzle[i][j]] = true;
        }
      }
      if (mistakes) break;
    }

    // Check columns
    if (!mistakes) {
      for (let j = 0; j < 4; j++) {
        const colValues = {};
        for (let i = 0; i < 4; i++) {
          if (tempPuzzle[i][j] !== 0) {
            if (colValues[tempPuzzle[i][j]]) {
              mistakes = true;
              break;
            }
            colValues[tempPuzzle[i][j]] = true;
          }
        }
        if (mistakes) break;
      }
    }

    // Check 2x2 blocks
    if (!mistakes) {
      for (let blockRow = 0; blockRow < 2; blockRow++) {
        for (let blockCol = 0; blockCol < 2; blockCol++) {
          const blockValues = {};
          for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
              const row = blockRow * 2 + i;
              const col = blockCol * 2 + j;
              if (tempPuzzle[row][col] !== 0) {
                if (blockValues[tempPuzzle[row][col]]) {
                  mistakes = true;
                  break;
                }
                blockValues[tempPuzzle[row][col]] = true;
              }
            }
            if (mistakes) break;
          }
          if (mistakes) break;
        }
        if (mistakes) break;
      }
    }

    setMessage(
      mistakes
        ? "There are mistakes in your puzzle."
        : "No mistakes found so far."
    );
  };

  // Clear all unlocked cells
  const clearCells = () => {
    const newPuzzle = puzzle.map((row, i) =>
      row.map((cell, j) => (locked[i][j] ? cell : 0))
    );
    setPuzzle(newPuzzle);
    setMessage("");
    setGameWon(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 max-w-md mx-auto bg-gray-900 text-gray-100 rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-100">4x4 Sudoku</h1>

      {gameWon && (
        <div className="mb-4 p-2 bg-green-900 text-green-100 rounded">
          {message}
        </div>
      )}

      {!gameWon && message && (
        <div className="mb-4 p-2 bg-yellow-900 text-yellow-100 rounded">
          {message}
        </div>
      )}

      <div className="grid grid-cols-4 gap-px bg-gray-700 border border-gray-600 mb-4">
        {puzzle.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            // Determine background color based on position
            const blockRow = Math.floor(rowIndex / 2);
            const blockCol = Math.floor(colIndex / 2);
            const isEvenBlock = (blockRow + blockCol) % 2 === 0;

            return (
              <input
                key={`${rowIndex}-${colIndex}`}
                type="text"
                value={cell === 0 ? "" : cell}
                onChange={(e) =>
                  handleCellChange(rowIndex, colIndex, e.target.value)
                }
                className={`w-12 h-12 text-center text-xl font-bold border border-gray-700 focus:outline-none focus:border-blue-400 text-gray-100 ${
                  locked[rowIndex][colIndex] ? "bg-gray-800" : "bg-gray-900"
                } ${isEvenBlock ? "bg-gray-800" : "bg-gray-900"}`}
                disabled={locked[rowIndex][colIndex]}
                maxLength="1"
              />
            );
          })
        )}
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={checkMistakes}
          className="px-4 py-2 bg-indigo-700 text-gray-100 rounded hover:bg-indigo-600"
        >
          Check
        </button>
        <button
          onClick={clearCells}
          className="px-4 py-2 bg-amber-700 text-gray-100 rounded hover:bg-amber-600"
        >
          Clear
        </button>
        <button
          onClick={generateNewPuzzle}
          className="px-4 py-2 bg-emerald-700 text-gray-100 rounded hover:bg-emerald-600"
        >
          New Game
        </button>
      </div>

      <div className="text-sm text-gray-400">
        <p>
          Fill in the grid so that every row, column, and 2x2 box contains the
          digits 1-4.
        </p>
      </div>
    </div>
  );
}
