const Agenda = () => {
  const agendaItems = [
    { time: "8:00 - 8:30", title: "Registrations" },
    { time: "8:30 - 9:00", title: "Oil Lamp & Introduction" },
    { time: "9:00 - 9:50", title: "SE Session" },
    { time: "9:50 - 10:40", title: "Cybersecurity & AI" },
    { time: "10:40 - 11:00", title: "Short Break" },
    { time: "11:00 - 11:30", title: "Motivational Speech" },
    { time: "11:30 - 12:15", title: "Project Management & Business Analysis" },
    { time: "12:15 - 1:00", title: "Interval" },
    { time: "1:00 - 2:15", title: "Game / Gaming Development" },
    { time: "2:15 - 3:00", title: "Q&A Session and Panel Discussion" },
    { time: "3:00 - 3:30", title: "Vote of Thanks" },
  ];

  return (
    <div
      className="flex h-screen"
      style={{ backgroundColor: "#191b1f", color: "#e0e0e0" }}
    >
      {/* Vertical Date Label */}
      <div
        className="w-20 flex items-center justify-center border-r"
        style={{ backgroundColor: "#1f2227", borderColor: "#2c3039" }}
      >
        <h1 className="transform -rotate-90 text-xl font-bold p-2 whitespace-nowrap text-gray-300">
          Agenda
        </h1>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6 mb-20">
        {agendaItems.map((item, index) => (
          <AgendaItem key={index} time={item.time} title={item.title} />
        ))}
      </div>
    </div>
  );
};

const AgendaItem = ({ time, title }: { time: string; title: string }) => (
  <div
    className="p-4 rounded shadow border-l-4 transition"
    style={{
      backgroundColor: "#262930",
      borderColor: "#333842",
    }}
  >
    <p className="text-sm font-mono text-gray-400">{time}</p>
    <h2 className="text-lg font-semibold text-gray-200">{title}</h2>
  </div>
);

export default Agenda;
