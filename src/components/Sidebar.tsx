"use client";

import { logout } from "@/firebase/api";
import { LogOut, ScanQrCode, User } from "lucide-react";
import Link from "next/link";
import { FaUserShield } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await logout(); // Firebase sign out
    router.push("/"); // Redirect to login page
  };

  return (
    <div className="w-20 py-10 gap-8 flex flex-col items-center justify-center bg-blue-400 rounded-tr-3xl rounded-br-3xl rounded-3xl ml-3 border-4 border-white">
      <Link href="/admin/" className="relative z-10">
        <User className="w-10 h-10 text-white" />
      </Link>

      <Link href="/admin/verify-and-attend" className="relative z-10">
        <ScanQrCode className="w-10 h-10 text-white" />
      </Link>

      <Link href="/admin/manage-admins" className="relative z-10">
        <FaUserShield className="w-10 h-10 text-white" />
      </Link>

      <LogOut
        className="w-10 h-10 text-white cursor-pointer"
        onClick={handleLogout}
      />
    </div>
  );
};

export default Sidebar;
