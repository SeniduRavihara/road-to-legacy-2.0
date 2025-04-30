"use client"

import { useState } from "react";
import {
  Trophy,
  Award,
  Star,
  Crown,
  Medal,
  ChevronUp,
  ChevronDown,
  User,
} from "lucide-react";

const LeaderBoard = () => {
  const [timeFilter, setTimeFilter] = useState("weekly");

  // Colors from the provided color scheme
  const colors = {
    darkest: "#191b1f",
    darker: "#1f2227",
    dark: "#262930",
    medium: "#2c3039",
    light: "#333842",
  };

  // Sample data for the leaderboard
  const players = [
    {
      id: 1,
      name: "AlexTheGreat",
      score: 9850,
      avatar: null,
      rank: 1,
      change: 2,
    },
    { id: 2, name: "NightOwl", score: 8730, avatar: null, rank: 2, change: 0 },
    {
      id: 3,
      name: "PixelWarrior",
      score: 7600,
      avatar: null,
      rank: 3,
      change: 5,
    },
    {
      id: 4,
      name: "CosmicDrifter",
      score: 6940,
      avatar: null,
      rank: 4,
      change: -2,
    },
    {
      id: 5,
      name: "ShadowHunter",
      score: 6210,
      avatar: null,
      rank: 5,
      change: 1,
    },
    {
      id: 6,
      name: "NeonRider",
      score: 5800,
      avatar: null,
      rank: 6,
      change: -1,
    },
    {
      id: 7,
      name: "GalaxyGladiator",
      score: 5450,
      avatar: null,
      rank: 7,
      change: 3,
    },
    {
      id: 8,
      name: "PhoenixRising",
      score: 4920,
      avatar: null,
      rank: 8,
      change: -4,
    },
    {
      id: 9,
      name: "TitaniumTiger",
      score: 4750,
      avatar: null,
      rank: 9,
      change: 0,
    },
    {
      id: 10,
      name: "VortexViper",
      score: 4320,
      avatar: null,
      rank: 10,
      change: 2,
    },
  ];

  // Get rank icon based on position
  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-300" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return (
          <div className="w-6 h-6 flex items-center justify-center font-bold text-gray-400">
            {rank}
          </div>
        );
    }
  };

  // Get change indicator icon
  const getChangeIndicator = (change) => {
    if (change > 0) {
      return <ChevronUp className="w-4 h-4 text-green-500" />;
    } else if (change < 0) {
      return <ChevronDown className="w-4 h-4 text-red-500" />;
    }
    return <div className="w-4 h-4 flex items-center justify-center">-</div>;
  };

  return (
    <div
      className="rounded-xl shadow-lg p-6 max-w-4xl mx-auto"
      style={{ backgroundColor: colors.darkest }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Crown className="mr-2 text-yellow-400" /> Leaderboard
        </h2>

        {/* Time filter selector */}
        <div
          className="flex rounded-lg p-1"
          style={{ backgroundColor: colors.darker }}
        >
          {["daily", "weekly", "monthly", "all-time"].map((filter) => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={`px-3 py-1 text-sm rounded-md transition-all ${
                timeFilter === filter
                  ? "text-white font-medium"
                  : "text-gray-400 hover:text-gray-200"
              }`}
              style={{
                backgroundColor:
                  timeFilter === filter ? colors.light : "transparent",
              }}
            >
              {filter.charAt(0).toUpperCase() +
                filter.slice(1).replace("-", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div
          className="rounded-lg p-4 flex items-center"
          style={{ backgroundColor: colors.dark }}
        >
          <div
            className="p-3 rounded-full mr-4"
            style={{ backgroundColor: colors.medium }}
          >
            <Trophy className="text-yellow-400 w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Top Player</p>
            <p className="text-white font-bold">{players[0].name}</p>
          </div>
        </div>

        <div
          className="rounded-lg p-4 flex items-center"
          style={{ backgroundColor: colors.dark }}
        >
          <div
            className="p-3 rounded-full mr-4"
            style={{ backgroundColor: colors.medium }}
          >
            <Star className="text-blue-400 w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Highest Score</p>
            <p className="text-white font-bold">
              {players[0].score.toLocaleString()}
            </p>
          </div>
        </div>

        <div
          className="rounded-lg p-4 flex items-center"
          style={{ backgroundColor: colors.dark }}
        >
          <div
            className="p-3 rounded-full mr-4"
            style={{ backgroundColor: colors.medium }}
          >
            <Award className="text-purple-400 w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Players Ranked</p>
            <p className="text-white font-bold">{players.length}</p>
          </div>
        </div>
      </div>

      {/* Leaderboard table */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ backgroundColor: colors.darker }}
      >
        {/* Table header */}
        <div
          className="grid grid-cols-12 p-4 text-gray-400 text-sm font-medium"
          style={{ backgroundColor: colors.dark }}
        >
          <div className="col-span-1 text-center">#</div>
          <div className="col-span-5">Player</div>
          <div className="col-span-3 text-right">Score</div>
          <div className="col-span-3 text-center">Trend</div>
        </div>

        {/* Table body */}
        <div className="divide-y" style={{ divideColor: colors.dark }}>
          {players.map((player) => (
            <div
              key={player.id}
              className="grid grid-cols-12 p-4 items-center transition-colors"
              style={{
                backgroundColor:
                  player.rank <= 3 ? colors.darker : colors.darker,
                ":hover": { backgroundColor: colors.dark },
              }}
            >
              {/* Rank */}
              <div className="col-span-1 flex justify-center">
                {getRankIcon(player.rank)}
              </div>

              {/* Player */}
              <div className="col-span-5 flex items-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                  style={{ backgroundColor: colors.light }}
                >
                  <User className="w-6 h-6 text-gray-400" />
                </div>
                <span className="font-medium text-white">{player.name}</span>
              </div>

              {/* Score */}
              <div className="col-span-3 text-right font-mono font-medium text-white">
                {player.score.toLocaleString()}
              </div>

              {/* Trend */}
              <div className="col-span-3 flex items-center justify-center">
                <div
                  className={`flex items-center rounded-full px-3 py-1 ${
                    player.change > 0
                      ? "bg-green-500 bg-opacity-20 text-green-400"
                      : player.change < 0
                        ? "bg-red-500 bg-opacity-20 text-red-400"
                        : "bg-gray-500 bg-opacity-20 text-gray-400"
                  }`}
                >
                  {getChangeIndicator(player.change)}
                  <span className="ml-1 text-sm">
                    {Math.abs(player.change) || "-"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 text-center text-sm text-gray-500">
        Rankings updated as of April 30, 2025 •{" "}
        {timeFilter.charAt(0).toUpperCase() +
          timeFilter.slice(1).replace("-", " ")}{" "}
        Stats
      </div>
    </div>
  );
};

export default LeaderBoard;
