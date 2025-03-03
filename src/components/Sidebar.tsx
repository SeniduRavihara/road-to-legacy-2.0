"use client";

import { logout } from "@/firebase/api";
import { Home, LogOut, ScanQrCode, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUserShield } from "react-icons/fa";
import ScanTicket from "./ScanTicket";

const Sidebar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await logout(); // Firebase sign out
    router.push("/"); // Redirect to login page
  };

  return (
    <div className="w-20 py-10 gap-8 flex flex-col items-center justify-center bg-[#262930] rounded-tr-3xl rounded-br-3xl rounded-3xl ml-3 border-[#333842]">
      <Link href="/" className="relative z-10 cursor-pointer p-2">
        <Home className="w-14 h-14 rounded-2xl p-2 text-[#c7c7c7] hover:bg-blue-600  duration-300" />
      </Link>

      <Link href="/admin/" className="relative z-10 cursor-pointer">
        <User className="w-14 h-14 rounded-2xl p-2 text-[#c7c7c7] hover:bg-blue-600  duration-300" />
      </Link>

      <ScanTicket>
        <ScanQrCode className="w-14 h-14 rounded-2xl p-2 text-[#c7c7c7] hover:bg-blue-600  duration-300" />
      </ScanTicket>

      <Link
        href="/admin/manage-admins"
        className="relative z-10 cursor-pointer"
      >
        <FaUserShield className="w-14 h-14 rounded-2xl p-2 text-[#c7c7c7] hover:bg-blue-600  duration-300" />
      </Link>

      <LogOut
        className="w-10 h-10 text-[#c7c7c7] cursor-pointer "
        onClick={handleLogout}
      />
    </div>
  );
};

export default Sidebar;
