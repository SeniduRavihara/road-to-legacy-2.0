"use client";

import { JSX, useEffect, useRef, useState } from "react";

// Define TypeScript interfaces for puzzle data structure
interface ClueInfo {
  clue: string;
  answer: string;
  row: number;
  col: number;
}

interface PuzzleData {
  grid: string[][];
  across: {
    [key: string]: ClueInfo;
  };
  down: {
    [key: string]: ClueInfo;
  };
}

interface GridSize {
  rows: number;
  cols: number;
}

interface ViewportSize {
  width: number;
  height: number;
}

type Direction = "across" | "down";
type CellPosition = [number, number] | null;

export default function WordPuzzle(): JSX.Element {
  // Custom tech crossword based on provided clues
  const puzzle: PuzzleData = {
    // Grid layout with solution letters
    grid: [
      // 0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18  19  20  21  22
      [
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        "S",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
      ], // 0
      [
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        "Y",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
      ], // 1
      [
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        "N",
        " ",
        " ",
        " ",
        " ",
        "M",
        " ",
        " ",
        " ",
      ], // 2
      [
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        "C",
        " ",
        " ",
        "T",
        " ",
        " ",
        " ",
        " ",
        "E",
        " ",
        " ",
        " ",
      ], // 3
      [
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        "V",
        "I",
        "R",
        "T",
        "U",
        "A",
        "L",
        "I",
        "Z",
        "A",
        "T",
        "I",
        "O",
        "N",
      ], // 4
      [
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        "Y",
        " ",
        " ",
        "X",
        " ",
        " ",
        " ",
        " ",
        "A",
        " ",
        " ",
        " ",
      ], // 5
      [
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        "P",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        "D",
        " ",
        " ",
        " ",
      ], // 6
      [
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        "T",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        "A",
        " ",
        " ",
        " ",
      ], // 7
      [
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        "S",
        "A",
        "N",
        "D",
        "B",
        "O",
        "X",
        "I",
        "N",
        "G",
        " ",
        " ",
        " ",
        "T",
        " ",
        " ",
        " ",
      ], // 8
      [
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        "U",
        " ",
        " ",
        " ",
        "J",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        "A",
        " ",
        " ",
        " ",
      ], // 9
      [
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        "T",
        " ",
        " ",
        " ",
        "A",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
      ], // 10
      [
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        "H",
        " ",
        " ",
        " ",
        "C",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
      ], // 11
      [
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        "E",
        " ",
        " ",
        " ",
        "K",
        "E",
        "R",
        "N",
        "E",
        "L",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
      ], // 12
      [
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        "N",
        " ",
        " ",
        " ",
        "I",
        " ",
        " ",
        " ",
        " ",
        "A",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
      ], // 13
      [
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        "T",
        " ",
        " ",
        " ",
        "N",
        " ",
        " ",
        " ",
        " ",
        "T",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
      ], // 14
      [
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        "I",
        " ",
        " ",
        " ",
        "G",
        " ",
        " ",
        " ",
        " ",
        "E",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
      ], // 15
      [
        "T",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        "C",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        "N",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
      ], // 16
      [
        "R",
        "A",
        "N",
        "S",
        "O",
        "M",
        "W",
        "A",
        "R",
        "E",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        "C",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
      ], // 17
      [
        "E",
        " ",
        " ",
        " ",
        " ",
        "I",
        " ",
        "T",
        " ",
        " ",
        " ",
        " ",
        "P",
        "R",
        "O",
        "X",
        "Y",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
      ], // 18
      [
        "E",
        " ",
        " ",
        " ",
        " ",
        "D",
        " ",
        "I",
        " ",
        " ",
        " ",
        " ",
        " ",
        "E",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
      ], // 19
      [
        " ",
        " ",
        " ",
        " ",
        " ",
        "D",
        " ",
        "O",
        " ",
        " ",
        " ",
        " ",
        " ",
        "D",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
      ], // 20
      [
        " ",
        " ",
        " ",
        " ",
        " ",
        "L",
        " ",
        "N",
        " ",
        " ",
        " ",
        " ",
        "F",
        "U",
        "Z",
        "Z",
        "I",
        "N",
        "G",
        " ",
        " ",
        " ",
        " ",
      ], // 21
      [
        " ",
        " ",
        " ",
        " ",
        " ",
        "E",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        "N",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
      ], // 22
      [
        " ",
        " ",
        " ",
        " ",
        " ",
        "W",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        "D",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
      ], // 23
      [
        " ",
        " ",
        " ",
        " ",
        "C",
        "A",
        "C",
        "H",
        "E",
        " ",
        " ",
        " ",
        " ",
        "A",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
      ], // 24
      [
        " ",
        " ",
        " ",
        " ",
        " ",
        "R",
        " ",
        " ",
        " ",
        " ",
        "S",
        "U",
        "B",
        "N",
        "E",
        "T",
        "T",
        "I",
        "N",
        "G",
        " ",
        " ",
        " ",
      ], // 25
      [
        " ",
        " ",
        " ",
        " ",
        " ",
        "E",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        "C",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
      ], // 26
      [
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        "Y",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
      ], // 27
      


    ],
    // Across clues
    across: {
      "1": {
        clue: "A technology that allows running multiple operating systems on one physical machine.",
        answer: "VIRTUALIZATION",
        row: 4,
        col: 9,
      },
      "2": {
        clue: "The process of running a program in an isolated environment to test its behavior without affecting the system.",
        answer: "SANDBOXING",
        row: 8,
        col: 6,
      },
      "3": {
        clue: "The core component of an OS that manages system resources.",
        answer: "KERNEL",
        row: 12,
        col: 11,
      },
      "4": {
        clue: "A type of malicious software that locks or encrypts a user's files and demands payment for access.",
        answer: "RANSOMWARE",
        row: 17,
        col: 0,
      },
      "5": {
        clue: "A software that acts as an intermediary between a user's device and the internet.",
        answer: "PROXY",
        row: 18,
        col: 12,
      },
      "6": {
        clue: "A method used to test software by simulating attacks.",
        answer: "FUZZING",
        row: 21,
        col: 12,
      },
      "7": {
        clue: "A storage location that temporarily holds data for quick access.",
        answer: "CACHE",
        row: 24,
        col: 4,
      },
      "8": {
        clue: "A method used to divide a computer network into multiple segments to improve security and performance.",
        answer: "SUBNETTING",
        row: 25,
        col: 10,
      },
    },
    // Down clues
    down: {
      "9": {
        clue: "The set of rules that govern the structure of statements in a programming language.",
        answer: "SYNTAX",
        row: 0,
        col: 14,
      },
      "10": {
        clue: "A tool for managing repositories, tracking changes, and collaborating on code.",
        answer: "CRYPTOJACKING",
        row: 3,
        col: 11,
      },
      "11": {
        clue: "A technique of storing and organizing data in a computer system to enable efficient access.",
        answer: "MIDDLEWARE",
        row: 2,
        col: 19,
      },
      "12": {
        clue: "A data structure that organizes information in a hierarchical format using nodes and branches.",
        answer: "TREE",
        row: 16,
        col: 0,
      },
      "13": {
        clue: "The process of verifying the identity of a user, system, or application.",
        answer: "AUTHENTICATION",
        row: 17,
        col: 5,
      },
      "14": {
        clue: "The delay between the input into a system and the desired outcome.",
        answer: "LATENCY",
        row: 12,
        col: 16,
      },
      "15": {
        clue: "The inclusion of extra components or resources to ensure system reliability.",
        answer: "REDUNDANCY",
        row: 18,
        col: 13,
      },
    },
  };

  // State for user inputs
  const [userInputs, setUserInputs] = useState<string[][]>([]);
  const [highlightedCell, setHighlightedCell] = useState<CellPosition>(null);
  const [highlightedClue, setHighlightedClue] = useState<string | null>(null);
  const [highlightDirection, setHighlightDirection] =
    useState<Direction>("across");
  const [complete, setComplete] = useState<boolean>(false);
  const [, setViewportSize] = useState<ViewportSize>({
    width: 0,
    height: 0,
  });
  const [cellSize, setCellSize] = useState<number>(35); // Default cell size
  const gridContainerRef = useRef<HTMLDivElement | null>(null);

  // Get gridSize
  const gridSize: GridSize = {
    rows: puzzle.grid.length,
    cols: puzzle.grid[0].length,
  };

  // Initialize the user inputs grid
  useEffect(() => {
    const initialInputs: string[][] = puzzle.grid.map((row) =>
      row.map((cell) => (cell === " " ? " " : ""))
    );
    setUserInputs(initialInputs);

    // Set viewport size
    setViewportSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Calculate appropriate cell size
    calculateCellSize();

    // Add resize listener
    window.addEventListener("resize", calculateCellSize);

    return () => {
      window.removeEventListener("resize", calculateCellSize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Calculate cell size based on viewport
  const calculateCellSize = (): void => {
    if (!gridContainerRef.current) return;

    const containerWidth = gridContainerRef.current.clientWidth;
    const maxCellSize = Math.floor(containerWidth / gridSize.cols) - 2;

    setCellSize(Math.min(35, maxCellSize)); // Max 35px, min based on container
  };

  // Check if the puzzle is complete
  useEffect(() => {
    if (userInputs.length === 0) return;

    let isComplete = true;

    for (let i = 0; i < puzzle.grid.length; i++) {
      for (let j = 0; j < puzzle.grid[i].length; j++) {
        if (
          puzzle.grid[i][j] !== " " &&
          (userInputs[i][j] === "" ||
            userInputs[i][j].toUpperCase() !== puzzle.grid[i][j])
        ) {
          isComplete = false;
          break;
        }
      }
      if (!isComplete) break;
    }

    setComplete(isComplete);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInputs]);

  // Handle cell input change
  const handleCellChange = (row: number, col: number, value: string): void => {
    if (puzzle.grid[row][col] === " ") return;

    const newInputs = [...userInputs];
    newInputs[row][col] = value.toUpperCase();
    setUserInputs(newInputs);

    // Move to next cell if there's input
    if (value !== "") {
      moveToNextCell(row, col);
    }
  };

  // Move to the next cell in the current direction
  const moveToNextCell = (row: number, col: number): void => {
    if (!highlightedClue) return;

    const direction = highlightDirection;
    let nextRow = row;
    let nextCol = col;

    if (direction === "across") {
      nextCol++;
      if (
        nextCol >= puzzle.grid[0].length ||
        puzzle.grid[nextRow][nextCol] === " "
      ) {
        return;
      }
    } else {
      nextRow++;
      if (
        nextRow >= puzzle.grid.length ||
        puzzle.grid[nextRow][nextCol] === " "
      ) {
        return;
      }
    }

    setHighlightedCell([nextRow, nextCol]);

    // Focus the next input field
    const nextInput = document.getElementById(
      `cell-${nextRow}-${nextCol}`
    ) as HTMLInputElement | null;
    if (nextInput) {
      nextInput.focus();
    }
  };

  // Handle cell click to highlight related cells
  const handleCellClick = (row: number, col: number): void => {
    if (puzzle.grid[row][col] === " ") return;

    setHighlightedCell([row, col]);

    // Determine which clue this cell belongs to
    let foundClue: string | null = null;
    let direction: Direction = highlightDirection;

    // If already highlighted, toggle direction
    if (
      highlightedCell &&
      highlightedCell[0] === row &&
      highlightedCell[1] === col
    ) {
      direction = direction === "across" ? "down" : "across";
    }

    // First try to find in current direction
    if (direction === "across") {
      Object.entries(puzzle.across).forEach(([clueNum, clue]) => {
        if (
          row === clue.row &&
          col >= clue.col &&
          col < clue.col + clue.answer.length
        ) {
          foundClue = clueNum;
        }
      });

      if (!foundClue) {
        direction = "down";
      }
    }

    if (direction === "down" && !foundClue) {
      Object.entries(puzzle.down).forEach(([clueNum, clue]) => {
        if (
          col === clue.col &&
          row >= clue.row &&
          row < clue.row + clue.answer.length
        ) {
          foundClue = clueNum;
        }
      });

      if (!foundClue) {
        direction = "across";
        Object.entries(puzzle.across).forEach(([clueNum, clue]) => {
          if (
            row === clue.row &&
            col >= clue.col &&
            col < clue.col + clue.answer.length
          ) {
            foundClue = clueNum;
          }
        });
      }
    }

    if (foundClue) {
      setHighlightedClue(foundClue);
      setHighlightDirection(direction);
    }

    // Scroll the clue into view
    if (foundClue) {
      const clueElement = document.getElementById(
        `clue-${direction}-${foundClue}`
      );
      if (clueElement) {
        clueElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  };

  // Check if a cell should be highlighted
  const isCellHighlighted = (row: number, col: number): boolean => {
    if (!highlightedCell || !highlightedClue) return false;

    const direction = highlightDirection;
    const clueInfo =
      direction === "across"
        ? puzzle.across[highlightedClue]
        : puzzle.down[highlightedClue];

    if (!clueInfo) return false;

    if (direction === "across") {
      return (
        row === clueInfo.row &&
        col >= clueInfo.col &&
        col < clueInfo.col + clueInfo.answer.length
      );
    } else {
      return (
        col === clueInfo.col &&
        row >= clueInfo.row &&
        row < clueInfo.row + clueInfo.answer.length
      );
    }
  };

  // Get clue number for a cell
  const getCellNumber = (row: number, col: number): string | null => {
    const numbers: string[] = [];

    Object.entries(puzzle.across).forEach(([clueNum, clue]) => {
      if (row === clue.row && col === clue.col) {
        numbers.push(clueNum);
      }
    });

    Object.entries(puzzle.down).forEach(([clueNum, clue]) => {
      if (row === clue.row && col === clue.col) {
        // Don't add duplicates
        if (!numbers.includes(clueNum)) {
          numbers.push(clueNum);
        }
      }
    });

    return numbers.length > 0 ? numbers[0] : null;
  };

  // Handle click on a clue
  const handleClueClick = (clueNum: string, direction: Direction): void => {
    setHighlightedClue(clueNum);
    setHighlightDirection(direction);

    const clueInfo =
      direction === "across" ? puzzle.across[clueNum] : puzzle.down[clueNum];

    if (clueInfo) {
      setHighlightedCell([clueInfo.row, clueInfo.col]);

      // Focus the first cell of the clue
      const firstInput = document.getElementById(
        `cell-${clueInfo.row}-${clueInfo.col}`
      ) as HTMLInputElement | null;
      if (firstInput) {
        firstInput.focus();
      }

      // Scroll to the cell
      const cellElement = document.getElementById(
        `cell-container-${clueInfo.row}-${clueInfo.col}`
      );
      if (cellElement) {
        cellElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  };

  // Clear all user inputs
  const clearPuzzle = (): void => {
    const emptyInputs: string[][] = puzzle.grid.map((row) =>
      row.map((cell) => (cell === " " ? " " : ""))
    );
    setUserInputs(emptyInputs);
    setComplete(false);
  };

  // Reveal solution for current puzzle
  const revealSolution = (): void => {
    const solution: string[][] = puzzle.grid.map((row) => [...row]);
    setUserInputs(solution);
  };

  // Handle keyboard navigation
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    row: number,
    col: number
  ): void => {
    if (e.key === "ArrowRight") {
      let nextCol = col + 1;
      while (nextCol < puzzle.grid[0].length) {
        if (puzzle.grid[row][nextCol] !== " ") {
          setHighlightedCell([row, nextCol]);
          (
            document.getElementById(
              `cell-${row}-${nextCol}`
            ) as HTMLInputElement | null
          )?.focus();
          break;
        }
        nextCol++;
      }
    } else if (e.key === "ArrowLeft") {
      let prevCol = col - 1;
      while (prevCol >= 0) {
        if (puzzle.grid[row][prevCol] !== " ") {
          setHighlightedCell([row, prevCol]);
          (
            document.getElementById(
              `cell-${row}-${prevCol}`
            ) as HTMLInputElement | null
          )?.focus();
          break;
        }
        prevCol--;
      }
    } else if (e.key === "ArrowDown") {
      let nextRow = row + 1;
      while (nextRow < puzzle.grid.length) {
        if (puzzle.grid[nextRow][col] !== " ") {
          setHighlightedCell([nextRow, col]);
          (
            document.getElementById(
              `cell-${nextRow}-${col}`
            ) as HTMLInputElement | null
          )?.focus();
          break;
        }
        nextRow++;
      }
    } else if (e.key === "ArrowUp") {
      let prevRow = row - 1;
      while (prevRow >= 0) {
        if (puzzle.grid[prevRow][col] !== " ") {
          setHighlightedCell([prevRow, col]);
          (
            document.getElementById(
              `cell-${prevRow}-${col}`
            ) as HTMLInputElement | null
          )?.focus();
          break;
        }
        prevRow--;
      }
    } else if (e.key === "Backspace" && userInputs[row][col] === "") {
      // Move to previous cell on backspace if current cell is empty
      if (highlightDirection === "across") {
        let prevCol = col - 1;
        while (prevCol >= 0) {
          if (puzzle.grid[row][prevCol] !== " ") {
            setHighlightedCell([row, prevCol]);
            (
              document.getElementById(
                `cell-${row}-${prevCol}`
              ) as HTMLInputElement | null
            )?.focus();
            break;
          }
          prevCol--;
        }
      } else {
        let prevRow = row - 1;
        while (prevRow >= 0) {
          if (puzzle.grid[prevRow][col] !== " ") {
            setHighlightedCell([prevRow, col]);
            (
              document.getElementById(
                `cell-${prevRow}-${col}`
              ) as HTMLInputElement | null
            )?.focus();
            break;
          }
          prevRow--;
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 max-w-6xl mx-auto bg-gray-900 text-gray-100 rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-100">
        Advanced Tech Crossword Puzzle
      </h1>

      {complete && (
        <div className="mb-4 p-2 bg-green-900 text-green-100 rounded w-full text-center">
          Congratulations! You&apos;ve completed the crossword puzzle!
        </div>
      )}

      <div className="flex flex-col lg:flex-row w-full gap-4">
        {/* Grid */}
        <div className="lg:w-3/5" ref={gridContainerRef}>
          <div className="overflow-auto max-h-[70vh] pb-4">
            <div
              className="gap-px bg-gray-700 border border-gray-600 inline-grid"
              style={{
                gridTemplateRows: `repeat(${gridSize.rows}, ${cellSize}px)`,
                gridTemplateColumns: `repeat(${gridSize.cols}, ${cellSize}px)`,
              }}
            >
              {puzzle.grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => {
                  const number = getCellNumber(rowIndex, colIndex);
                  const isHighlighted = isCellHighlighted(rowIndex, colIndex);

                  return (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      id={`cell-container-${rowIndex}-${colIndex}`}
                      className={`relative ${cell === " " ? "bg-gray-800" : "bg-gray-900"}`}
                      style={{
                        width: `${cellSize}px`,
                        height: `${cellSize}px`,
                      }}
                    >
                      {number && (
                        <span
                          className="absolute top-0 left-0 text-xs pl-1 text-gray-400"
                          style={{ fontSize: `${Math.max(8, cellSize / 4)}px` }}
                        >
                          {number}
                        </span>
                      )}
                      {cell !== " " && (
                        <input
                          id={`cell-${rowIndex}-${colIndex}`}
                          type="text"
                          maxLength={1}
                          value={userInputs[rowIndex]?.[colIndex] || ""}
                          onChange={(e) =>
                            handleCellChange(rowIndex, colIndex, e.target.value)
                          }
                          onClick={() => handleCellClick(rowIndex, colIndex)}
                          onKeyDown={(e) =>
                            handleKeyDown(e, rowIndex, colIndex)
                          }
                          className={`w-full h-full text-center font-bold border ${
                            isHighlighted
                              ? "bg-indigo-900 border-indigo-400"
                              : "bg-gray-900 border-gray-700"
                          } focus:outline-none focus:border-blue-400 text-gray-100 uppercase`}
                          style={{
                            fontSize: `${Math.max(14, cellSize / 2)}px`,
                          }}
                        />
                      )}
                      {cell === " " && (
                        <div className="w-full h-full bg-gray-800"></div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Clues */}
        <div className="lg:w-2/5 flex flex-col gap-4">
          <div className="h-1/2 overflow-y-auto">
            <h2 className="font-bold text-indigo-300 mb-1 sticky top-0 bg-gray-900 py-1">
              Across
            </h2>
            <ul className="text-sm">
              {Object.entries(puzzle.across).map(([clueNum, clue]) => (
                <li
                  key={`across-${clueNum}`}
                  id={`clue-across-${clueNum}`}
                  className={`cursor-pointer p-1 mb-1 ${
                    highlightedClue === clueNum &&
                    highlightDirection === "across"
                      ? "bg-indigo-900 text-indigo-100 rounded"
                      : ""
                  }`}
                  onClick={() => handleClueClick(clueNum, "across")}
                >
                  <span className="font-bold">{clueNum}.</span> {clue.clue}
                </li>
              ))}
            </ul>
          </div>
          <div className="h-1/2 overflow-y-auto">
            <h2 className="font-bold text-indigo-300 mb-1 sticky top-0 bg-gray-900 py-1">
              Down
            </h2>
            <ul className="text-sm">
              {Object.entries(puzzle.down).map(([clueNum, clue]) => (
                <li
                  key={`down-${clueNum}`}
                  id={`clue-down-${clueNum}`}
                  className={`cursor-pointer p-1 mb-1 ${
                    highlightedClue === clueNum && highlightDirection === "down"
                      ? "bg-indigo-900 text-indigo-100 rounded"
                      : ""
                  }`}
                  onClick={() => handleClueClick(clueNum, "down")}
                >
                  <span className="font-bold">{clueNum}.</span> {clue.clue}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex gap-2 my-4">
        <button
          onClick={clearPuzzle}
          className="px-4 py-2 bg-amber-700 text-gray-100 rounded hover:bg-amber-600"
        >
          Clear All
        </button>
        <button
          onClick={revealSolution}
          className="px-4 py-2 bg-purple-700 text-gray-100 rounded hover:bg-purple-600"
        >
          Reveal Solution
        </button>
      </div>

      <div className="text-sm text-gray-400">
        <p>
          Click on a cell or clue to start. Use arrow keys to navigate the
          puzzle.
        </p>
      </div>
    </div>
  );
}
