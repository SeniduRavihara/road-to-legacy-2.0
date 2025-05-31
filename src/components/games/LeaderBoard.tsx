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
  Volume2,
  VolumeX,
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
  createdAt: Timestamp | Date;
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
  const [isMuted, setIsMuted] = useState(false);
  const [isBackgroundMusicPlaying, setIsBackgroundMusicPlaying] = useState(false);
  
  const prevTeamDataRef = useRef<TeamDataType[]>([]);
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const rankUpSoundRef = useRef<HTMLAudioElement | null>(null);
  const winSoundRef = useRef<HTMLAudioElement | null>(null);
  const prevWinnerRef = useRef<string | null>(null);

  // Colors from the provided color scheme
  const colors = {
    darkest: "#191b1f",
    darker: "#1f2227",
    dark: "#262930",
    medium: "#2c3039",
    light: "#333842",
  };

  // Initialize audio files
  useEffect(() => {
    try {
      // Only initialize audio once
      if (!backgroundMusicRef.current) {
        backgroundMusicRef.current = new Audio('/sounds/background-music.mp3');
        backgroundMusicRef.current.loop = true;
        backgroundMusicRef.current.volume = 0.05;
      }

      if (!rankUpSoundRef.current) {
        rankUpSoundRef.current = new Audio('/sounds/rank-up.mp3');
        rankUpSoundRef.current.volume = 0.9;
      }

      if (!winSoundRef.current) {
        winSoundRef.current = new Audio('/sounds/win.wav');
        winSoundRef.current.volume = 0.5;
      }

      // Start background music automatically (with user interaction handling)
      const playBackgroundMusic = () => {
        if (backgroundMusicRef.current && !isMuted && !isBackgroundMusicPlaying) {
          backgroundMusicRef.current.play().then(() => {
            setIsBackgroundMusicPlaying(true);
          }).catch((error) => {
            console.warn('Could not play background music:', error);
          });
        }
      };

      // Try to play immediately, or wait for user interaction
      if (!isMuted && !isBackgroundMusicPlaying) {
        playBackgroundMusic();
      }
      
      // Fallback: play on first user interaction
      const handleFirstInteraction = () => {
        if (!isMuted && !isBackgroundMusicPlaying) {
          playBackgroundMusic();
        }
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('keydown', handleFirstInteraction);
      };
      
      if (!isBackgroundMusicPlaying) {
        document.addEventListener('click', handleFirstInteraction);
        document.addEventListener('keydown', handleFirstInteraction);
      }

      return () => {
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('keydown', handleFirstInteraction);
      };
    } catch (error) {
      console.warn('Audio files not found. Make sure to add audio files to /sounds folder:', error);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Remove isMuted from dependencies to prevent re-initialization

  // Add effect to handle mute state changes for background music
  useEffect(() => {
    if (backgroundMusicRef.current) {
      if (isMuted && isBackgroundMusicPlaying) {
        backgroundMusicRef.current.pause();
        setIsBackgroundMusicPlaying(false);
      } else if (!isMuted && !isBackgroundMusicPlaying && backgroundMusicRef.current.paused) {
        // Only try to play if user has already interacted and audio is paused
        backgroundMusicRef.current.play().then(() => {
          setIsBackgroundMusicPlaying(true);
        }).catch((error) => {
          console.warn('Could not resume background music:', error);
        });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMuted]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current = null;
      }
      if (rankUpSoundRef.current) {
        rankUpSoundRef.current.pause();
        rankUpSoundRef.current = null;
      }
      if (winSoundRef.current) {
        winSoundRef.current.pause();
        winSoundRef.current = null;
      }
    };
  }, []);
  const playRankUpSound = () => {
    if (rankUpSoundRef.current && !isMuted) {
      rankUpSoundRef.current.currentTime = 0;
      rankUpSoundRef.current.play().catch((error) => {
        console.warn('Could not play rank up sound:', error);
      });
    }
  };

  // Play win sound
  const playWinSound = () => {
    if (winSoundRef.current && !isMuted) {
      winSoundRef.current.currentTime = 0;
      winSoundRef.current.play().catch((error) => {
        console.warn('Could not play win sound:', error);
      });
    }
  };

  // Toggle mute
  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    if (backgroundMusicRef.current) {
      if (newMutedState) {
        // Properly pause and reset state
        backgroundMusicRef.current.pause();
        setIsBackgroundMusicPlaying(false);
      } else {
        // Only play if not already playing
        if (backgroundMusicRef.current.paused) {
          backgroundMusicRef.current.play().then(() => {
            setIsBackgroundMusicPlaying(true);
          }).catch((error) => {
            console.warn('Could not resume background music:', error);
          });
        }
      }
    }
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

    const processedTeams = processTeamData(teamData);
    const currentRankings: { [key: string]: number } = {};

    // Sort teams by highest round first (descending), then by time (ascending)
    const sorted = [...processedTeams].sort((a, b) => {
      if (a.highestRound !== b.highestRound) {
        return b.highestRound - a.highestRound;
      }
      return a.totalTimeTaken - b.totalTimeTaken;
    });

    // Create new ranking map
    sorted.forEach((team, index) => {
      currentRankings[team.name] = index + 1;
    });

    // Calculate rank changes and detect rank improvements
    const updatedTeams = sorted.map((team) => {
      let change = 0;

      if (prevRankings[team.name]) {
        change = prevRankings[team.name] - currentRankings[team.name];
        // Play rank up sound if team moved up in ranking
        if (change > 0) {
          setTimeout(() => playRankUpSound(), 100);
        }
      }

      return {
        ...team,
        rank: currentRankings[team.name],
        change,
      };
    });

    // Check for new winner (team that just completed all rounds and is in first place)
    const totalRounds = 3;
    const currentWinner = updatedTeams.find(team => 
      team.rank === 1 && team.highestRound === totalRounds
    );
    
    if (currentWinner && prevWinnerRef.current !== currentWinner.name) {
      const prevSortedTeams = sortedTeams;
      const prevWinner = prevSortedTeams.find(team => team.rank === 1);
      // Play win sound if there's a new winner or if someone just completed the game
      if (!prevWinner || prevWinner.highestRound < totalRounds) {
        setTimeout(() => playWinSound(), 200);
      }
      prevWinnerRef.current = currentWinner.name;
    }

    setSortedTeams(updatedTeams);
    setPrevRankings(currentRankings);
    prevTeamDataRef.current = teamData;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamData]); // Removed prevRankings and sortedTeams from dependency array

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
    return sortedTeams[0];
  };

  const getBestTime = () => {
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

    const maxRounds = 3;
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
    const totalRounds = 3;
    return sortedTeams.filter((team) => team.highestRound === totalRounds)
      .length;
  };

  const topTeam = getTopTeam();

  return (
    <div
      className="rounded-xl shadow-lg p-6 max-w-4xl mx-auto relative mt-10"
      style={{ backgroundColor: colors.darkest }}
    >
      {/* Sound Control Buttons */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        {/* Main Mute Button */}
        <button
          onClick={toggleMute}
          className="p-2 rounded-full hover:bg-opacity-80 transition-colors"
          style={{ backgroundColor: colors.medium }}
          title={isMuted ? "Unmute sounds" : "Mute sounds"}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-gray-400" />
          ) : (
            <Volume2 className={`w-5 h-5 ${isBackgroundMusicPlaying ? 'text-green-400' : 'text-gray-400'}`} />
          )}
        </button>

        {/* Audio Testing Panel */}
        {/* <div
          className="p-3 rounded-lg flex flex-col gap-2 min-w-[200px]"
          style={{ backgroundColor: colors.darker }}
        >
          <div className="text-white text-sm font-medium mb-2">Audio Test Panel</div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-300 text-xs">Background Music:</span>
            <div className="flex gap-1">
              <button
                onClick={() => {
                  if (backgroundMusicRef.current && !isMuted) {
                    if (backgroundMusicRef.current.paused) {
                      backgroundMusicRef.current.play().then(() => {
                        setIsBackgroundMusicPlaying(true);
                      }).catch((error) => {
                        console.warn('Could not play background music:', error);
                      });
                    }
                  }
                }}
                className="px-2 py-1 text-xs bg-green-600 hover:bg-green-700 text-white rounded"
                disabled={isMuted}
              >
                Play
              </button>
              <button
                onClick={() => {
                  if (backgroundMusicRef.current) {
                    backgroundMusicRef.current.pause();
                    setIsBackgroundMusicPlaying(false);
                  }
                }}
                className="px-2 py-1 text-xs bg-red-600 hover:bg-red-700 text-white rounded"
              >
                Pause
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-300 text-xs">Rank Up Sound:</span>
            <button
              onClick={() => {
                console.log('Testing rank up sound...');
                if (rankUpSoundRef.current && !isMuted) {
                  rankUpSoundRef.current.currentTime = 0;
                  rankUpSoundRef.current.play().then(() => {
                    console.log('Rank up sound played successfully');
                  }).catch((error) => {
                    console.error('Could not play rank up sound:', error);
                  });
                } else {
                  console.log('Rank up sound ref:', rankUpSoundRef.current, 'isMuted:', isMuted);
                }
              }}
              className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded"
              disabled={isMuted}
            >
              Test
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-300 text-xs">Win Sound:</span>
            <button
              onClick={() => {
                console.log('Testing win sound...');
                if (winSoundRef.current && !isMuted) {
                  winSoundRef.current.currentTime = 0;
                  winSoundRef.current.play().then(() => {
                    console.log('Win sound played successfully');
                  }).catch((error) => {
                    console.error('Could not play win sound:', error);
                  });
                } else {
                  console.log('Win sound ref:', winSoundRef.current, 'isMuted:', isMuted);
                }
              }}
              className="px-2 py-1 text-xs bg-purple-600 hover:bg-purple-700 text-white rounded"
              disabled={isMuted}
            >
              Test
            </button>
          </div>

          <div className="text-xs text-gray-400 mt-2 border-t border-gray-600 pt-2">
            <div>BG Music: {isBackgroundMusicPlaying ? 'Playing' : 'Stopped'}</div>
            <div>Muted: {isMuted ? 'Yes' : 'No'}</div>
            <div>BG Loaded: {backgroundMusicRef.current ? 'Yes' : 'No'}</div>
            <div>Rank Loaded: {rankUpSoundRef.current ? 'Yes' : 'No'}</div>
            <div>Win Loaded: {winSoundRef.current ? 'Yes' : 'No'}</div>
          </div>
        </div> */}
      </div>

      <div className="flex justify-between items-center mb-6 pr-64">{/* Increased padding to account for wider test panel */}
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
        {!isMuted && isBackgroundMusicPlaying && (
          <span className="ml-2 text-green-400">♪ Music Playing</span>
        )}
      </div>
    </div>
  );
};

export default LeaderBoard;