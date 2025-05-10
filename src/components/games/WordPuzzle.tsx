"use client";

import { JSX, useEffect, useRef, useState } from "react";
import { puzzle } from "./puzzle-structure";

// Define TypeScript interfaces for puzzle data structure
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

  // State for user inputs
  const [userInputs, setUserInputs] = useState<string[][]>([]);
  const [highlightedCell, setHighlightedCell] = useState<CellPosition>(null);
  const [highlightedClue, setHighlightedClue] = useState<string | null>(null);
  const [highlightDirection, setHighlightDirection] =
    useState<Direction>("across");
  const [complete, setComplete] = useState<boolean>(false);
  const [viewportSize, setViewportSize] = useState<ViewportSize>({
    width: 0,
    height: 0,
  });
  const [cellSize, setCellSize] = useState<number>(35); // Default cell size
  const [zoomLevel, setZoomLevel] = useState<number>(1); // New zoom level state
  const [showScrollIndicator, setShowScrollIndicator] =
    useState<boolean>(false);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const gridContainerRef = useRef<HTMLDivElement | null>(null);
  const gridScrollContainerRef = useRef<HTMLDivElement | null>(null);

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
    const handleResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();

    // Calculate appropriate cell size
    calculateCellSize();

    // Add resize listener
    window.addEventListener("resize", () => {
      handleResize();
      calculateCellSize();
    });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Calculate cell size based on viewport
  const calculateCellSize = (): void => {
    if (!gridContainerRef.current) return;

    const containerWidth = gridContainerRef.current.clientWidth;

    // Base size calculation
    let calculatedSize = Math.min(
      35,
      Math.floor(containerWidth / gridSize.cols) - 2
    );

    // Apply zoom factor
    calculatedSize = Math.max(20, calculatedSize * zoomLevel);

    setCellSize(calculatedSize);
  };

  // Recalculate cell size when zoom level changes
  useEffect(() => {
    calculateCellSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoomLevel]);

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
  }, [userInputs]);

  // Handle scroll events
  const handleScroll = () => {
    setShowScrollIndicator(true);

    // Clear existing timeout
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    // Set new timeout to hide indicator
    const timeout = setTimeout(() => {
      setShowScrollIndicator(false);
    }, 1500);

    setScrollTimeout(timeout);
  };

  useEffect(() => {
    const scrollContainer = gridScrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);

      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }
      };
    }
  }, [scrollTimeout]);

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
        cellElement.scrollIntoView({ behavior: "smooth", block: "center" });
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

  // Zoom controls
  const zoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 2.0));
  };

  const zoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 0.6));
  };

  const resetZoom = () => {
    setZoomLevel(1.0);
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
    <div className="flex flex-col items-center justify-center p-2 sm:p-4 max-w-full sm:max-w-6xl mx-auto bg-gray-900 text-gray-100 rounded-lg">
      <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-gray-100">
        Advanced Tech Crossword Puzzle
      </h1>

      {complete && (
        <div className="mb-2 sm:mb-4 p-2 bg-green-900 text-green-100 rounded w-full text-center">
          Congratulations! You&apos;ve completed the crossword puzzle!
        </div>
      )}

      {/* Zoom controls */}
      <div className="flex justify-center gap-2 w-full mb-2 sm:mb-4">
        <button
          onClick={zoomOut}
          className="px-2 sm:px-3 py-1 bg-indigo-800 text-gray-100 rounded hover:bg-indigo-700 flex items-center"
          aria-label="Zoom out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 12H4"
            />
          </svg>
        </button>
        <button
          onClick={resetZoom}
          className="px-2 sm:px-3 py-1 bg-indigo-800 text-gray-100 rounded hover:bg-indigo-700"
          aria-label="Reset zoom"
        >
          {Math.round(zoomLevel * 100)}%
        </button>
        <button
          onClick={zoomIn}
          className="px-2 sm:px-3 py-1 bg-indigo-800 text-gray-100 rounded hover:bg-indigo-700 flex items-center"
          aria-label="Zoom in"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row w-full gap-2 sm:gap-4">
        {/* Grid */}
        <div className="lg:w-3/5" ref={gridContainerRef}>
          <div className="relative border border-gray-600 rounded-lg overflow-hidden bg-gray-800">
            {/* Scroll indicators */}
            <div
              className={`absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-gray-900 to-transparent opacity-50 pointer-events-none transition-opacity duration-300 ${showScrollIndicator ? "opacity-50" : "opacity-0"}`}
            ></div>
            <div
              className={`absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-gray-900 to-transparent opacity-50 pointer-events-none transition-opacity duration-300 ${showScrollIndicator ? "opacity-50" : "opacity-0"}`}
            ></div>
            <div
              className={`absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-gray-900 to-transparent opacity-50 pointer-events-none transition-opacity duration-300 ${showScrollIndicator ? "opacity-50" : "opacity-0"}`}
            ></div>
            <div
              className={`absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-gray-900 to-transparent opacity-50 pointer-events-none transition-opacity duration-300 ${showScrollIndicator ? "opacity-50" : "opacity-0"}`}
            ></div>

            <div
              ref={gridScrollContainerRef}
              className="overflow-auto max-h-[calc(70vh-80px)] pb-4 scrollbar-container"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#4f46e5 #1f2937",
              }}
            >
              <div
                className="gap-px bg-gray-700 inline-grid m-2"
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
                            style={{
                              fontSize: `${Math.max(8, cellSize / 4)}px`,
                            }}
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
                              handleCellChange(
                                rowIndex,
                                colIndex,
                                e.target.value
                              )
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
        </div>

        {/* Clues */}
        <div className="lg:w-2/5 flex flex-col gap-2 sm:gap-4 mt-2 lg:mt-0">
          {/* Across clues */}
          <div className="h-1/2 overflow-y-auto scrollbar-container rounded-lg border border-gray-700">
            <h2 className="font-bold text-indigo-300 mb-1 sticky top-0 bg-gray-900 py-1 px-2 border-b border-gray-700">
              Across
            </h2>
            <ul className="text-sm px-2">
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

          {/* Down clues */}
          <div className="h-1/2 overflow-y-auto scrollbar-container rounded-lg border border-gray-700">
            <h2 className="font-bold text-indigo-300 mb-1 sticky top-0 bg-gray-900 py-1 px-2 border-b border-gray-700">
              Down
            </h2>
            <ul className="text-sm px-2">
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
          className="px-3 py-2 bg-amber-700 text-gray-100 rounded hover:bg-amber-600"
        >
          Clear All
        </button>
        <button
          onClick={revealSolution}
          className="px-3 py-2 bg-purple-700 text-gray-100 rounded hover:bg-purple-600"
        >
          Reveal Solution
        </button>
      </div>

      <div className="text-xs sm:text-sm text-gray-400 text-center">
        <p>
          Click on a cell or clue to start. Use arrow keys to navigate.
          <span className="hidden sm:inline"> Zoom to adjust puzzle size.</span>
        </p>
        <p className="text-xs mt-1 text-gray-500">
          Swipe or scroll to view more puzzle content
        </p>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx global>{`
        .scrollbar-container::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        .scrollbar-container::-webkit-scrollbar-track {
          background: #1f2937;
          border-radius: 4px;
        }

        .scrollbar-container::-webkit-scrollbar-thumb {
          background: #4f46e5;
          border-radius: 4px;
        }

        .scrollbar-container::-webkit-scrollbar-thumb:hover {
          background: #6366f1;
        }

        .scrollbar-container {
          scrollbar-width: thin;
          scrollbar-color: #4f46e5 #1f2937;
        }
      `}</style>
    </div>
  );
}
