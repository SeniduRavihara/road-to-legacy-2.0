"use client";

import { Timestamp } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  ChevronDown,
  ChevronUp,
  Clock,
  Crown,
  Flag,
  Medal,
  Trophy,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Using your data structure directly in the component
export interface GameResult {
  gameId: string;
  gameName: string;
  timeInMs: number;
  formattedTime: string;
}

export type TeamDataType = {
  name: string;
  leaderEmail: string;
  members: string[];
  createdAt: Timestamp | Date; // Using 'any' for Timestamp to avoid dependency issues
  gameResults: GameResult[];
  totalTimeTaken: number;
};

const LeaderBoard = ({ teamData }: { teamData: TeamDataType[] }) => {
  const [sortedTeams, setSortedTeams] = useState<
    (TeamDataType & { rank: number; change: number; highestRound: number })[]
  >([]);
  const [prevRankings, setPrevRankings] = useState<{ [key: string]: number }>(
    {}
  );
  const prevTeamDataRef = useRef<TeamDataType[]>([]);

  // Colors from the provided color scheme
  const colors = {
    darkest: "#191b1f",
    darker: "#1f2227",
    dark: "#262930",
    medium: "#2c3039",
    light: "#333842",
  };

  // Helper to format milliseconds to readable time
  const formatTime = (ms: number | undefined | null) => {
    if (ms === undefined || ms === null || isNaN(ms)) {
      return "Not Started";
    }

    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor(ms / (1000 * 60 * 60));

    return `${hours > 0 ? `${hours}h ` : ""}${minutes}m ${seconds}s`;
  };

  // Calculate the highest round completed for each team
  const getHighestRound = (team: TeamDataType) => {
    if (!team.gameResults || !Array.isArray(team.gameResults)) return 0;

    // Count how many games have been completed
    return team.gameResults.length;
  };

  // Process team data with round information
  const processTeamData = (teams: TeamDataType[]) => {
    return teams.map((team) => {
      const highestRound = getHighestRound(team);

      return {
        ...team,
        highestRound,
        totalTimeTaken:
          team.totalTimeTaken !== undefined && team.totalTimeTaken !== null
            ? team.totalTimeTaken
            : Infinity,
      };
    });
  };

  // Calculate rank changes when teamData updates
  useEffect(() => {
    if (!teamData || teamData.length === 0) {
      setSortedTeams([]);
      return;
    }

    // Process teams to include round information
    const processedTeams = processTeamData(teamData);

    // Store previous rankings for comparison
    const currentRankings: { [key: string]: number } = {};

    // Sort teams by highest round first (descending), then by time (ascending)
    const sorted = [...processedTeams].sort((a, b) => {
      // Compare highest round completed (higher is better)
      if (a.highestRound !== b.highestRound) {
        return b.highestRound - a.highestRound;
      }

      // If tied on rounds, compare by time (faster is better)
      return a.totalTimeTaken - b.totalTimeTaken;
    });

    // Create new ranking map
    sorted.forEach((team, index) => {
      currentRankings[team.name] = index + 1;
    });

    // Calculate rank changes
    const updatedTeams = sorted.map((team) => {
      let change = 0;

      // If we have previous rankings, calculate the change
      if (prevRankings[team.name]) {
        change = prevRankings[team.name] - currentRankings[team.name];
      }

      return {
        ...team,
        rank: currentRankings[team.name],
        change,
      };
    });

    setSortedTeams(updatedTeams);
    setPrevRankings(currentRankings);
    prevTeamDataRef.current = teamData;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamData]);

  // Get rank icon based on position
  const getRankIcon = (rank: number) => {
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
  const getChangeIndicator = (change: number) => {
    if (change > 0) {
      return <ChevronUp className="w-4 h-4 text-green-500" />;
    } else if (change < 0) {
      return <ChevronDown className="w-4 h-4 text-red-500" />;
    }
    return <div className="w-4 h-4 flex items-center justify-center">-</div>;
  };

  // Get top team, total teams and best time
  const getTopTeam = () => {
    if (sortedTeams.length === 0) return null;
    // Get the team with the highest rank (rank 1)
    return sortedTeams[0];
  };

  const getBestTime = () => {
    // Find the team with the most rounds completed
    const teamsWithMaxRounds = sortedTeams.reduce(
      (acc, team) => {
        if (!acc.length || team.highestRound > acc[0].highestRound) {
          return [team];
        } else if (team.highestRound === acc[0].highestRound) {
          acc.push(team);
        }
        return acc;
      },
      [] as typeof sortedTeams
    );

    // From those teams, find the one with the best time
    if (teamsWithMaxRounds.length) {
      const fastestTeam = teamsWithMaxRounds.reduce((fastest, current) => {
        return current.totalTimeTaken < fastest.totalTimeTaken
          ? current
          : fastest;
      }, teamsWithMaxRounds[0]);

      return fastestTeam.totalTimeTaken !== Infinity
        ? fastestTeam.totalTimeTaken
        : null;
    }

    return null;
  };

  // Check if team has started at least one game
  const hasStarted = (
    team: TeamDataType & { rank: number; change: number; highestRound: number }
  ) => {
    return team.highestRound > 0;
  };

  // Get team status text based on rounds completed and time
  const getTeamStatusText = (
    team: TeamDataType & { rank: number; change: number; highestRound: number }
  ) => {
    if (!hasStarted(team)) {
      return "Not Started";
    }
    return formatTime(team.totalTimeTaken);
  };

  // Render game progress indicator
  const renderGameProgress = (
    team: TeamDataType & { rank: number; change: number; highestRound: number }
  ) => {
    if (!hasStarted(team)) {
      return <div className="text-gray-400 italic">Waiting to start</div>;
    }

    // Determine the maximum number of rounds in the game
    const maxRounds = 3; // Based on your description of 3 separate games

    // Show which games have been completed
    const gameNames = team.gameResults?.map((game) => game.gameName).join(", ");

    return (
      <div className="flex flex-col">
        <div className="flex items-center">
          <Flag className="w-4 h-4 mr-1 text-blue-400" />
          <span className="text-blue-400 font-medium">
            Round {team.highestRound}/{maxRounds}
          </span>
        </div>
        {gameNames && (
          <span className="text-xs text-gray-400 mt-1 truncate">
            {gameNames}
          </span>
        )}
      </div>
    );
  };

  // Render time cell for a team
  const renderTimeCell = (
    team: TeamDataType & { rank: number; change: number; highestRound: number }
  ) => {
    const hasTime = hasStarted(team);

    return (
      <motion.div
        className={`col-span-2 text-right font-mono font-medium ${hasTime ? "text-white" : "text-gray-400 italic"}`}
        key={`${team.name}-${team.totalTimeTaken}`}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {getTeamStatusText(team)}
      </motion.div>
    );
  };

  // Get count of teams that have started
  const getStartedTeamsCount = () => {
    return sortedTeams.filter((team) => hasStarted(team)).length;
  };

  // Get count of teams that have completed all rounds
  const getFinishedTeamsCount = () => {
    const totalRounds = 3; // Based on your description
    return sortedTeams.filter((team) => team.highestRound === totalRounds)
      .length;
  };

  const topTeam = getTopTeam();

  return (
    <div
      className="rounded-xl shadow-lg p-6 max-w-4xl mx-auto"
      style={{ backgroundColor: colors.darkest }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Crown className="mr-2 text-yellow-400" /> Team Leaderboard
        </h2>
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
            <p className="text-gray-400 text-sm">Top Team</p>
            <p className="text-white font-bold">
              {topTeam ? topTeam.name : "No Teams Yet"}
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
            <Clock className="text-blue-400 w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Best Time</p>
            <p className="text-white font-bold">
              {getBestTime() !== null
                ? formatTime(getBestTime())
                : "No Times Yet"}
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
            <p className="text-gray-400 text-sm">Progress</p>
            <p className="text-white font-bold">
              {getFinishedTeamsCount()} finished | {getStartedTeamsCount()}{" "}
              active
            </p>
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
          <div className="col-span-4">Team</div>
          <div className="col-span-3">Progress</div>
          <div className="col-span-2 text-right">Time</div>
          <div className="col-span-2 text-center">Trend</div>
        </div>

        {/* Table body */}
        <div className="divide-y divide-[#262930]">
          {sortedTeams.length === 0 ? (
            <div
              className="p-8 text-center text-gray-400"
              style={{ backgroundColor: colors.darker }}
            >
              No teams available yet
            </div>
          ) : (
            <AnimatePresence>
              {sortedTeams.map((team) => (
                <motion.div
                  key={team.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    duration: 0.4,
                  }}
                  className="grid grid-cols-12 p-4 items-center transition-colors hover:bg-opacity-50"
                  style={{
                    backgroundColor:
                      hasStarted(team) && team.rank <= 3
                        ? colors.dark
                        : colors.darker,
                    opacity: hasStarted(team) ? 1 : 0.8,
                  }}
                >
                  {/* Rank */}
                  <div className="col-span-1 flex justify-center">
                    {hasStarted(team) ? (
                      getRankIcon(team.rank)
                    ) : (
                      <div className="w-6 h-6 flex items-center justify-center font-bold text-gray-600">
                        -
                      </div>
                    )}
                  </div>

                  {/* Team */}
                  <div className="col-span-4 flex items-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                      style={{ backgroundColor: colors.light }}
                    >
                      <User className="w-6 h-6 text-gray-400" />
                    </div>
                    <div>
                      <span className="font-medium text-white block">
                        {team.name}
                      </span>
                      <span className="text-gray-400 text-xs">
                        {team.members.length} members
                      </span>
                    </div>
                  </div>

                  {/* Game Progress */}
                  <div className="col-span-3">{renderGameProgress(team)}</div>

                  {/* Time */}
                  {renderTimeCell(team)}

                  {/* Trend */}
                  <div className="col-span-2 flex items-center justify-center">
                    {hasStarted(team) ? (
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className={`flex items-center rounded-full px-3 py-1 ${
                          team.change > 0
                            ? "bg-green-500 bg-opacity-20 text-green-400"
                            : team.change < 0
                              ? "bg-red-500 bg-opacity-20 text-red-400"
                              : "bg-gray-500 bg-opacity-20 text-gray-400"
                        }`}
                      >
                        {getChangeIndicator(team.change)}
                        <span className="ml-1 text-sm">
                          {Math.abs(team.change) || "-"}
                        </span>
                      </motion.div>
                    ) : (
                      <div className="text-gray-600 text-sm">Pending</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 text-center text-sm text-gray-500">
        Rankings updated in real-time based on game progress
      </div>
    </div>
  );
};

export default LeaderBoard;
