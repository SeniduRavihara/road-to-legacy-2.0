"use client";

import { logout } from "@/firebase/api";
import { Dices, Home, LogOut, ScanQrCode, User } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { FaUserShield } from "react-icons/fa";
import ScanTicket from "./ScanTicket";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname(); // Get current path

  const handleLogout = async () => {
    await logout(); // Firebase sign out
    router.push("/"); // Redirect to login page
  };

  // Function to check if the link is active
  const isActive = (path: string) => pathname === path;

  return (
    <div className="w-screen py-4 sm:w-20 sm:py-10 gap-5 px-3 sm:px-0 flex flex-row sm:flex-col items-center justify-around bg-[#262930] rounded-3xl border-[#333842]">
      <Link href="/">
        <Home
          className={`w-8 h-8 sm:w-12 sm:h-12 sm:p-2 p-1 rounded-2xl cursor-pointer duration-300 flex items-center justify-center ${
            isActive("/")
              ? "text-white bg-blue-600"
              : "text-[#c7c7c7] sm:hover:bg-blue-600"
          }`}
        />
      </Link>

      <Link href="/admin">
        <User
          className={`w-8 h-8 sm:w-12 sm:h-12 sm:p-2 p-1  rounded-2xl cursor-pointer duration-300 flex items-center justify-center${
            isActive("/admin")
              ? "text-white bg-blue-600"
              : "text-[#c7c7c7] sm:hover:bg-blue-600"
          }`}
        />
      </Link>

      <ScanTicket>
        <ScanQrCode
          className={`w-8 h-8 sm:w-12 sm:h-12 sm:p-2 p-1  rounded-2xl cursor-pointer duration-300 flex items-center justify-center ${
            isActive("/scan-ticket")
              ? "text-white bg-blue-600"
              : "text-[#c7c7c7] sm:hover:bg-blue-600"
          }`}
        />
      </ScanTicket>

      <Link href="/admin/manage-admins">
        <FaUserShield
          className={`w-8 h-8 sm:w-12 sm:h-12 sm:p-2 p-1  rounded-2xl cursor-pointer duration-300 flex items-center justify-center ${
            isActive("/admin/manage-admins")
              ? "text-white bg-blue-600"
              : "text-[#c7c7c7] sm:hover:bg-blue-600"
          }`}
        />
      </Link>

      <Link href="/admin/game">
        <Dices
          className={`w-8 h-8 sm:w-12 sm:h-12 sm:p-2 p-1  rounded-2xl cursor-pointer duration-300 flex items-center justify-center ${
            isActive("/admin/game")
              ? "text-white bg-blue-600"
              : "text-[#c7c7c7] sm:hover:bg-blue-600"
          }`}
        />
      </Link>

      <LogOut
        className="w-8 h-8 sm:w-12 sm:h-12 sm:p-2 p-1 rounded-2xl text-[#c7c7c7] sm:hover:bg-blue-600 cursor-pointer flex items-center justify-center"
        onClick={handleLogout}
      />
    </div>
  );
};

export default Sidebar;
