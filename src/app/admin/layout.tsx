"use client";

import Sidebar from "@/components/Sidebar";
import { useData } from "@/hooks/useData";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import arrow icons

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUserData } = useData();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // State to control sidebar visibility

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    if (!currentUserData?.isAdmin) {
      // router.push("/");
      return;
    }

    setIsLoading(false);
  }, [router, currentUserData]);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-screen min-h-screen flex flex-row justify-between bg-[#1F2227]">
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-20 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200 text-white"
        aria-label={isSidebarVisible ? "Hide sidebar" : "Show sidebar"}
      >
        {isSidebarVisible ? (
          <ChevronLeft className="w-5 h-5" />
        ) : (
          <ChevronRight className="w-5 h-5" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`w-full h-20 sm:w-20 sm:h-screen sm:left-2 p-2 sm:p-0 fixed sm:top-0 bottom-2 z-10 flex items-center justify-center transition-transform duration-300 ease-in-out ${
          isSidebarVisible 
            ? "translate-x-0" 
            : "translate-x-[-100%] sm:translate-x-[-88px]"
        }`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div 
        className={`w-full h-full transition-all duration-300 ease-in-out ${
          isSidebarVisible ? "sm:ml-20" : "sm:ml-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}