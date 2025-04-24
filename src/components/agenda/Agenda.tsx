// Agenda.tsx
import { CalendarIcon, Clock3Icon } from "lucide-react";
import { motion, Variants } from "framer-motion";

// Define types for our component props and data
interface AgendaItem {
  time: string;
  title: string;
  category: AgendaCategory;
}

type AgendaCategory =
  | "technical"
  | "break"
  | "keynote"
  | "discussion"
  | "ceremony"
  | "admin";

interface AgendaItemProps {
  time: string;
  title: string;
  category: AgendaCategory;
  categoryColor: string;
  categoryBg: string;
  variants?: Variants;
}

const Agenda: React.FC = () => {
  const agendaItems: AgendaItem[] = [
    { time: "8:00 - 8:30", title: "Registrations", category: "admin" },
    {
      time: "8:30 - 9:00",
      title: "Oil Lamp & Introduction",
      category: "ceremony",
    },
    { time: "9:00 - 9:50", title: "SE Session", category: "technical" },
    {
      time: "9:50 - 10:40",
      title: "Cybersecurity & AI",
      category: "technical",
    },
    { time: "10:40 - 11:00", title: "Short Break", category: "break" },
    {
      time: "11:00 - 11:30",
      title: "Motivational Speech",
      category: "keynote",
    },
    {
      time: "11:30 - 12:15",
      title: "Project Management & Business Analysis",
      category: "technical",
    },
    { time: "12:15 - 1:00", title: "Interval", category: "break" },
    {
      time: "1:00 - 2:15",
      title: "Game / Gaming Development",
      category: "technical",
    },
    {
      time: "2:15 - 3:00",
      title: "Q&A Session and Panel Discussion",
      category: "discussion",
    },
    { time: "3:00 - 3:30", title: "Vote of Thanks", category: "ceremony" },
  ];

  const getCategoryColor = (category: AgendaCategory): string => {
    switch (category) {
      case "technical":
        return "border-[#4a7bbd]";
      case "break":
        return "border-[#5ab17f]";
      case "keynote":
        return "border-[#9a6fb5]";
      case "discussion":
        return "border-[#d18f56]";
      case "ceremony":
        return "border-[#d1b556]";
      case "admin":
        return "border-[#7c8494]";
      default:
        return "border-[#7c8494]";
    }
  };

  const getCategoryBg = (category: AgendaCategory): string => {
    switch (category) {
      case "technical":
        return "bg-[#2a3244]";
      case "break":
        return "bg-[#2a3a33]";
      case "keynote":
        return "bg-[#2e2a36]";
      case "discussion":
        return "bg-[#362e2a]";
      case "ceremony":
        return "bg-[#36352a]";
      case "admin":
        return "bg-[#2a2d34]";
      default:
        return "bg-[#2a2d34]";
    }
  };

  // Animation variants
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-10 lg:w-20 flex flex-col items-center pt-6 border-r border-[#2c3039] bg-[#1f2227]">
        <div className="flex flex-col items-center mb-8">
          <CalendarIcon className="w-8 h-8 text-[#4a7bbd]" />
          <h1 className="mt-3 text-sm font-bold text-gray-200 tracking-wide z-10">
            AGENDA
          </h1>
          <div className="mt-3 h-1 w-12 bg-[#4a7bbd] rounded-full z-10"></div>
        </div>

        <div className="flex-1 flex items-center">
          <div className="h-full w-1 bg-gradient-to-b from-[#4a7bbd] via-[#9a6fb5] to-[#d1b556] rounded-full"></div>
        </div>
      </div>

      {/* Main Content Area with fixed scrolling */}
      <div className="flex-1 overflow-hidden bg-[#191b1f]">
        <motion.div
          className="h-full overflow-y-auto overflow-x-hidden p-6 space-y-5 pb-16"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <div className="flex items-center gap-2 mb-8">
            <Clock3Icon className="w-5 h-5 text-[#4a7bbd]" />
            <h2 className="text-lg text-gray-300 font-medium">
              Session Timeline
            </h2>
          </div>
          {agendaItems.map((item, index) => (
            <AgendaItem
              key={index}
              time={item.time}
              title={item.title}
              category={item.category}
              categoryColor={getCategoryColor(item.category)}
              categoryBg={getCategoryBg(item.category)}
              variants={itemVariants}
            />
          ))}
          <div className="h-12"></div>{" "}
          {/* Extra padding at bottom for better scrolling */}
        </motion.div>
      </div>
    </div>
  );
};

const AgendaItem: React.FC<AgendaItemProps> = ({
  time,
  title,
  category,
  categoryColor,
  categoryBg,
  variants,
}) => (
  <motion.div
    variants={variants}
    className={`p-4 rounded-lg shadow-md border-l-4 transition-all duration-300 hover:shadow-lg hover:translate-x-1 ${categoryColor} ${categoryBg} bg-[#262930]`}
  >
    <div className="flex justify-between items-start">
      <div>
        <h2 className="text-lg font-semibold text-white mb-1">{title}</h2>
        <p className="text-sm font-mono text-gray-400">{time}</p>
      </div>
      <span className="text-xs px-2 py-1 rounded-full bg-[#1f2227] text-gray-300 capitalize">
        {category}
      </span>
    </div>
  </motion.div>
);

export default Agenda;
