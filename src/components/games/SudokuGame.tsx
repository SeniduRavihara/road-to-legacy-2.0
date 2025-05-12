"use client";

import { cn } from "@/lib/utils";
import { JSX, useEffect, useState } from "react";

interface GameProps {
  isWon?: boolean;
  setIsWon: (isWon: boolean) => void;
}

// Define TypeScript types
type CellValue = 0 | 1 | 2 | 3 | 4;
type SudokuGrid = CellValue[][];
type LockGrid = boolean[][];

export default function SudokuGame({ setIsWon }: GameProps) {
  // Initial puzzle state (0 represents empty cells)
  const [puzzle, setPuzzle] = useState<SudokuGrid>([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  // Locked cells (cells that cannot be edited)
  const [locked, setLocked] = useState<LockGrid>([
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
  ]);

  // Game state
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  // Mobile optimization - track screen size
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Track selected cell for number pad input
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);

  useEffect(() => {
    setIsWon(gameWon);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameWon]);

  // Update screen size detection
  useEffect(() => {
    const checkIsMobile = (): void => {
      setIsMobile(window.innerWidth < 640);
    };

    // Initial check
    checkIsMobile();

    // Listen for resize events
    window.addEventListener("resize", checkIsMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Generate a new puzzle on first load
  useEffect(() => {
    generateNewPuzzle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Check if the puzzle is solved correctly
  const checkSolution = (): boolean => {
    // First check that no cells are empty
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (puzzle[i][j] === 0) {
          return false;
        }
      }
    }

    // Check rows
    for (let i = 0; i < 4; i++) {
      const rowSet = new Set<number>();
      for (let j = 0; j < 4; j++) {
        if (rowSet.has(puzzle[i][j])) {
          return false;
        }
        rowSet.add(puzzle[i][j]);
      }
    }

    // Check columns
    for (let j = 0; j < 4; j++) {
      const colSet = new Set<number>();
      for (let i = 0; i < 4; i++) {
        if (colSet.has(puzzle[i][j])) {
          return false;
        }
        colSet.add(puzzle[i][j]);
      }
    }

    // Check 2x2 subgrids
    for (let blockRow = 0; blockRow < 2; blockRow++) {
      for (let blockCol = 0; blockCol < 2; blockCol++) {
        const blockSet = new Set<number>();
        for (let i = 0; i < 2; i++) {
          for (let j = 0; j < 2; j++) {
            const row = blockRow * 2 + i;
            const col = blockCol * 2 + j;
            if (blockSet.has(puzzle[row][col])) {
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
  const generateSolvedPuzzle = (): SudokuGrid => {
    const solved: SudokuGrid = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    // Fill the grid with a valid solution
    // First row is random
    const firstRow = [1, 2, 3, 4].sort(
      () => Math.random() - 0.5
    ) as CellValue[];
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
  const generateNewPuzzle = (): void => {
    const solved = generateSolvedPuzzle();
    const newPuzzle: SudokuGrid = solved.map((row) => [...row]) as SudokuGrid;
    const newLocked: LockGrid = Array(4)
      .fill(0)
      .map(() => Array(4).fill(true));

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
    setSelectedCell(null);
  };

  // Handle cell value change
  const handleCellChange = (row: number, col: number, value: string): void => {
    if (locked[row][col]) return;

    const newValue = value === "" ? 0 : parseInt(value);

    // Check if input is valid
    if (isNaN(newValue) || newValue < 1 || newValue > 4) {
      return;
    }

    const newPuzzle: SudokuGrid = puzzle.map((r, i) =>
      r.map((c, j) => (i === row && j === col ? (newValue as CellValue) : c))
    ) as SudokuGrid;

    setPuzzle(newPuzzle);

    // Check if puzzle is solved after a short delay to allow UI update
    setTimeout(() => {
      if (checkSolution()) {
        setGameWon(true);
        setMessage("Congratulations! You solved the puzzle!");
      }
    }, 100);
  };

  // Check if there are any mistakes
  const checkMistakes = (): void => {
    // Create a copy of the puzzle
    const tempPuzzle: SudokuGrid = puzzle.map((row) => [...row]) as SudokuGrid;

    // Check if any filled cell violates Sudoku rules
    let mistakes = false;

    // Check rows
    for (let i = 0; i < 4; i++) {
      const rowValues: Record<number, boolean> = {};
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
        const colValues: Record<number, boolean> = {};
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
          const blockValues: Record<number, boolean> = {};
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

    // Check if all cells are filled and no mistakes
    if (!mistakes) {
      const allFilled = tempPuzzle.every((row) =>
        row.every((cell) => cell !== 0)
      );
      if (allFilled && checkSolution()) {
        setGameWon(true);
        setMessage("Congratulations! You solved the puzzle!");
        return;
      }
    }

    setMessage(
      mistakes
        ? "There are mistakes in your puzzle."
        : "No mistakes found so far."
    );
  };

  // Clear all unlocked cells
  const clearCells = (): void => {
    const newPuzzle: SudokuGrid = puzzle.map((row, i) =>
      row.map((cell, j) => (locked[i][j] ? cell : 0))
    ) as SudokuGrid;
    setPuzzle(newPuzzle);
    setMessage("");
    setGameWon(false);
    setSelectedCell(null);
  };

  // Dynamic cell size based on screen size
  const getCellSize = (): string => {
    return isMobile ? "w-14 h-14" : "w-16 h-16";
  };

  // Handle cell click to select it without showing keyboard
  const handleCellClick = (rowIndex: number, colIndex: number): void => {
    if (!locked[rowIndex][colIndex]) {
      setSelectedCell({ row: rowIndex, col: colIndex });
    }
  };

  // Number pad for mobile devices
  const renderNumberPad = (): JSX.Element | null => {
    // if (!isMobile) return null;

    return (
      <div className="flex justify-center gap-2 my-4">
        {[1, 2, 3, 4].map((num) => (
          <button
            key={num}
            className="w-12 h-12 bg-gray-700 rounded-full text-xl font-bold flex items-center justify-center"
            onClick={() => {
              if (selectedCell) {
                // Use the selected cell to update the value
                const { row, col } = selectedCell;
                if (!locked[row][col]) {
                  handleCellChange(row, col, num.toString());
                }
              } else {
                // If no cell is selected, show a message
                setMessage("Please select a cell first");
              }
            }}
          >
            {num}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 max-w-md mx-auto bg-gray-900 text-gray-100 rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-100">4x4 Sudoku</h1>

      {gameWon && (
        <div className="mb-4 p-2 bg-green-900 text-green-100 rounded w-full text-center">
          {message}
        </div>
      )}

      {!gameWon && message && (
        <div className="mb-4 p-2 bg-yellow-900 text-yellow-100 rounded w-full text-center">
          {message}
        </div>
      )}

      <div className="grid grid-cols-4 gap-px bg-gray-700 border border-gray-600 mb-4 shadow-lg">
        {puzzle.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={cn(
                  getCellSize(),
                  "flex items-center justify-center",
                  "text-center text-2xl font-bold border border-gray-700 focus:outline-none text-gray-100",
                  locked[rowIndex][colIndex] ? "bg-gray-800" : "bg-gray-900",
                  {
                    "ring-2 ring-blue-500":
                      selectedCell?.row === rowIndex &&
                      selectedCell?.col === colIndex,
                  },
                  !locked[rowIndex][colIndex] && "cursor-pointer"
                )}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                aria-label={`Cell at row ${rowIndex + 1}, column ${colIndex + 1}`}
              >
                {cell !== 0 && cell}
              </div>
            );
          })
        )}
      </div>

      {renderNumberPad()}

      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        <button
          onClick={checkMistakes}
          className="px-4 py-2 bg-indigo-700 text-gray-100 rounded hover:bg-indigo-600 shadow-md"
          aria-label="Check for mistakes"
        >
          Check
        </button>
        <button
          onClick={clearCells}
          className="px-4 py-2 bg-amber-700 text-gray-100 rounded hover:bg-amber-600 shadow-md"
          aria-label="Clear all filled cells"
        >
          Clear
        </button>
        <button
          onClick={generateNewPuzzle}
          className="px-4 py-2 bg-emerald-700 text-gray-100 rounded hover:bg-emerald-600 shadow-md"
          aria-label="Start a new game"
        >
          New Game
        </button>
      </div>

      <div className="text-sm text-gray-400 text-center">
        <p>
          Fill in the grid so that every row, column, and 2x2 box contains the
          digits 1-4.
        </p>
        {isMobile && (
          <p className="mt-2">
            Tap a cell to select it, then use the number pad below.
          </p>
        )}
      </div>
    </div>
  );
}
