const VerticalTimeLine = () => {
  const timelineEvents = [
    { time: "10:00 AM", event: "Registration & Welcome" },
    { time: "11:00 AM", event: "Keynote Speech" },
    { time: "12:30 PM", event: "Lunch Break" },
    { time: "2:00 PM", event: "Panel Discussion" },
    { time: "4:00 PM", event: "Networking & Closing" },
  ];

  return (
    <div className="flex flex-col items-center space-y-6 py-8">
      <h2 className="text-3xl font-bold">Event Schedule</h2>
      <div className="relative border-l-4 border-blue-500">
        {timelineEvents.map((item, index) => (
          <div key={index} className="ml-4 mb-6">
            <div className="absolute -left-[12px] w-6 h-6 bg-blue-500 rounded-full"></div>
            <h3 className="text-xl font-semibold">{item.time}</h3>
            <p className="text-gray-700">{item.event}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalTimeLine;
