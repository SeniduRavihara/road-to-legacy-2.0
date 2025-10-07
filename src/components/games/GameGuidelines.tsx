interface GameGuidelinesProps {
  onProceed: () => void;
}

const GameGuidelines = ({ onProceed }: GameGuidelinesProps) => {
  //   const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-[#191B1F] p-4">
      <div className="max-w-4xl mx-auto bg-[#2c3039] rounded-lg shadow-xl p-6 text-[#f2f2f7]">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Road to Legacy - Game Guide
        </h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-3 text-[#f2f2f7]">
              Getting Started
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Team Formation:</strong> Create a team with 3-6 members,
                including one team leader
              </li>
              <li>
                <strong>Team Name:</strong> Choose a unique team name
              </li>
              <li>
                <strong>Team Leader Role:</strong> Appoint one team leader
              </li>
              <li>
                <strong>Adding Members:</strong> Add team members using their
                email addresses
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Enter email addresses manually, or</li>
                  <li>Use the QR code scanner to scan team member tickets</li>
                </ul>
              </li>
              <li>
                <strong>Account Access:</strong> All team members can log in and
                play the games
              </li>
              <li>
                <strong>Game Submission:</strong> Only the team leader can
                submit completed games
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-[#f2f2f7]">
              Game Structure
            </h2>
            <p className="mb-3">
              The competition consists of three challenging puzzles:
            </p>
            <ol className="list-decimal pl-6 space-y-4">
              <li>
                <strong>Sudoku Puzzle</strong>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Complete a 4x4 grid with numbers 1-4</li>
                  <li>
                    Each row, column, and 2x2 box must contain unique numbers
                  </li>
                  <li>Use the number pad to input numbers</li>
                  <li>Click &quot;Check&quot; to verify your progress</li>
                  <li>Use &quot;Clear&quot; to reset your entries</li>
                </ul>
              </li>
              <li>
                <strong>Tech Crossword</strong>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Solve technology-related clues</li>
                  <li>Fill in words both across and down</li>
                  <li>Use the keyboard or number pad for input</li>
                  <li>Click on clues to highlight related cells</li>
                </ul>
              </li>
              <li>
                <strong>15-Puzzle</strong>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Arrange numbered tiles in order</li>
                  <li>Tap on tiles to create the correct sequence</li>
                  <li>Complete the puzzle in minimum moves</li>
                </ul>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-[#f2f2f7]">
              Important Rules
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Complete all three puzzles in sequence</li>
              <li>Time is tracked for each puzzle and total completion</li>
              <li>Only the team leader can submit completed games</li>
              <li>All team members can contribute to solving the puzzles</li>
              <li>Results are automatically saved</li>
              <li>Leaderboard updates in real-time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-[#f2f2f7]">
              Tips for Success
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Plan your strategy before starting</li>
              <li>
                Use the &quot;Check&quot; feature in Sudoku to verify your
                progress
              </li>
              <li>In the crossword, read all clues before starting</li>
              <li>For the sliding puzzle, plan your moves to minimize steps</li>
              <li>Coordinate with team members for efficient solving</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-[#f2f2f7]">
              Technical Notes
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Game progress is automatically saved</li>
              <li>You can return to incomplete games</li>
              <li>Real-time leaderboard updates</li>
              <li>Mobile-friendly interface</li>
            </ul>
          </section>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={onProceed}
            className="bg-[#191b1f] text-[#f2f2f7] px-8 py-3 rounded-md hover:bg-opacity-90 transition"
          >
            Proceed to Team Registration
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameGuidelines;
