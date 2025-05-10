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

export const puzzle: PuzzleData = {grid: [
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "S", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "Y", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "N", " ", " ", " ", " ", "M", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", "V", "I", "R", "T", "U", "A", "L", "I", "Z", "A", "T", "I", "O", "N"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "C", " ", " ", "T", " ", " ", " ", " ", "E", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "Y", " ", " ", "X", " ", " ", " ", " ", "A", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "P", " ", " ", " ", " ", " ", " ", " ", "D", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "T", " ", " ", " ", " ", " ", " ", " ", "A", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", "S", "A", "N", "D", "B", "O", "X", "I", "N", "G", " ", " ", " ", "T", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", "U", " ", " ", " ", "J", " ", " ", " ", " ", " ", " ", " ", "A", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", "T", " ", " ", " ", "A", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", "H", " ", " ", " ", "C", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", "E", " ", " ", " ", "K", "E", "R", "N", "E", "L", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", "N", " ", " ", " ", "I", " ", " ", " ", " ", "A", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", "T", " ", " ", " ", "N", " ", " ", " ", " ", "T", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", "I", " ", " ", " ", "G", " ", " ", " ", " ", "E", " ", " ", " ", " ", " ", " "],
    ["T", " ", " ", " ", " ", " ", " ", "C", " ", " ", " ", " ", " ", " ", " ", " ", "N", " ", " ", " ", " ", " ", " "],
    ["R", "A", "N", "S", "O", "M", "W", "A", "R", "E", " ", " ", " ", " ", " ", " ", "C", " ", " ", " ", " ", " ", " "],
    ["E", " ", " ", " ", " ", "I", " ", "T", " ", " ", " ", " ", "P", "R", "O", "X", "Y", " ", " ", " ", " ", " ", " "],
    ["E", " ", " ", " ", " ", "D", " ", "I", " ", " ", " ", " ", " ", "E", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", "D", " ", "O", " ", " ", " ", " ", " ", "D", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", "L", " ", "N", " ", " ", " ", " ", "F", "U", "Z", "Z", "I", "N", "G", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", "E", " ", " ", " ", " ", " ", " ", " ", "N", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", "W", " ", " ", " ", " ", " ", " ", " ", "D", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", "C", "A", "C", "H", "E", " ", " ", " ", " ", "A", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", "R", " ", " ", " ", " ", "S", "U", "B", "N", "E", "T", "T", "I", "N", "G", " ", " ", " "],
    [" ", " ", " ", " ", " ", "E", " ", " ", " ", " ", " ", " ", " ", "C", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "Y", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ],across: {
    "1": {
      clue: "A technology that allows running multiple operating systems on one physical machine.",
      answer: "VIRTUALIZATION",
      row: 3,
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
      clue: "The unauthorized use of a computer or network to mine cryptocurrency.",
      answer: "CRYPTOJACKING",
      row: 3,
      col: 11,
    },
    "11": {
      clue: "A set of data that describes and gives information about other data.",
      answer: "METADATA",
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
      row: 8,
      col: 7,
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
    "16": {
      clue: "Software that acts as an intermediary between different applications or components.",
      answer: "MIDDLEWARE",
      row: 17,
      col: 5,
    },
  },}