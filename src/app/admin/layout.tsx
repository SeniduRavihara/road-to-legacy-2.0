"use client";

import Sidebar from "@/components/Sidebar";
import { useData } from "@/hooks/useData";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUserData } = useData();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // To avoid redirect during the render phase

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login"); // Redirect to login if no token is found
      return;
    }

    if (!currentUserData?.isAdmin) {
      // router.push("/"); // Redirect to home page if not an admin
      return;
    }

    setIsLoading(false); // Once the checks are done, set loading to false
  }, [router, currentUserData]); // This effect runs when `router` or `currentUserData` changes

  if (isLoading) {
    return <div>Loading...</div>; // Optionally, show a loading indicator while the redirection is being checked
  }

  return (
    <div className="max-w-screen min-h-screen flex flex-row justify-between bg-[#333842]">
      <div className="w-full h-20 sm:w-20 sm:h-screen sm:left-2 p-2 sm:p-0 fixed sm:top-0 bottom-2 z-10 flex items-center justify-center" >
        <Sidebar />
      </div>
      <div className="w-full h-full sm:ml-20">{children}</div>
    </div>
  );
}
