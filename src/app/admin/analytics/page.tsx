"use client";

import { db } from "@/firebase/config";
import { DelegatesExportType } from "@/types";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { collection, onSnapshot } from "firebase/firestore";
import {
  CheckCircle2,
  MailCheck,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const statMeta = [
  {
    label: "Total Registered",
    icon: <Users className="w-7 h-7 text-blue-400" />,
    color: "from-blue-500 to-blue-700",
    key: "total",
  },
  {
    label: "Arrived",
    icon: <UserCheck className="w-7 h-7 text-green-400" />,
    color: "from-green-500 to-green-700",
    key: "arrived",
  },
  {
    label: "Selected",
    icon: <UserPlus className="w-7 h-7 text-purple-400" />,
    color: "from-purple-500 to-purple-700",
    key: "selected",
  },
  {
    label: "Email Sent",
    icon: <MailCheck className="w-7 h-7 text-yellow-400" />,
    color: "from-yellow-500 to-yellow-700",
    key: "emailSent",
  },
  {
    label: "Confirmed",
    icon: <CheckCircle2 className="w-7 h-7 text-pink-400" />,
    color: "from-pink-500 to-pink-700",
    key: "confirmed",
  },
];

function formatDate(date: Date) {
  return date.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

const AnalyticsPage = () => {
  const [delegates, setDelegates] = useState<DelegatesExportType[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    arrived: 0,
    selected: 0,
    emailSent: 0,
    confirmed: 0,
  });

  useEffect(() => {
    const collectionRef = collection(db, "delegates");
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as DelegatesExportType[];
      setDelegates(data);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    setStats({
      total: delegates.length,
      arrived: delegates.filter((d) => d.arrived).length,
      selected: delegates.filter((d) => d.selected).length,
      emailSent: delegates.filter((d) => d.confirmationEmailSended).length,
      confirmed: delegates.filter((d) => d.confirmArrival).length,
    });
  }, [delegates]);

  // --- Line Chart Data: Registrations by Day ---
  const registrationsByDay: Record<string, number> = {};
  delegates.forEach((d) => {
    let dateStr = "Unknown";
    if (d.createdAt) {
      const date = new Date(d.createdAt);
      if (!isNaN(date.getTime())) {
        dateStr = formatDate(date);
      }
    }
    if (dateStr !== "Unknown") {
      registrationsByDay[dateStr] = (registrationsByDay[dateStr] || 0) + 1;
    }
  });
  const sortedDates = Object.keys(registrationsByDay).sort();
  let cumulative = 0;
  const cumulativeRegistrations = sortedDates.map((date) => {
    cumulative += registrationsByDay[date];
    return cumulative;
  });

  const lineChartData = {
    labels: sortedDates,
    datasets: [
      {
        label: "Total Registrations (Cumulative)",
        data: cumulativeRegistrations,
        fill: true,
        borderColor: "#60a5fa",
        backgroundColor: "rgba(96,165,250,0.15)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#2563eb",
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: { color: "#fff" },
      },
      title: {
        display: false,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        ticks: { color: "#cbd5e1" },
        grid: { color: "#334155" },
      },
      y: {
        beginAtZero: true,
        ticks: { color: "#cbd5e1" },
        grid: { color: "#334155" },
      },
    },
  };

  const chartData = statMeta.map((meta) => ({
    ...meta,
    value: stats[meta.key as keyof typeof stats],
  }));

  return (
    <div className="p-4 sm:p-8 min-h-screen bg-gradient-to-br from-[#1f2227] to-[#23272f]">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
          Event Analytics
        </h1>
        <p className="text-lg text-gray-400 font-light">
          Real-time insights into event registrations and engagement.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
        {chartData.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-2xl shadow-lg p-5 flex flex-col items-center bg-gradient-to-br ${stat.color} relative overflow-hidden`}
          >
            <div className="absolute right-2 top-2 opacity-10 text-white text-7xl pointer-events-none select-none">
              {stat.icon}
            </div>
            <div className="z-10">{stat.icon}</div>
            <span className="text-base text-white/80 mt-2">{stat.label}</span>
            <span className="text-3xl sm:text-4xl font-bold text-white mt-1 drop-shadow">
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      <div className="w-full max-w-3xl mx-auto">
        <div className="flex items-center mb-4">
          <h2 className="text-xl font-semibold text-white">
            Registrations Over Time
          </h2>
          <div className="flex-1 border-b border-gray-700 ml-4" />
        </div>
        <div className="bg-[#23272f] rounded-xl p-4 shadow-lg">
          <Line data={lineChartData} options={lineChartOptions} height={320} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
