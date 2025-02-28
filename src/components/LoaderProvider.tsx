"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "./loader/Loader";

const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 1500); // Adjust timing as needed
    return () => clearTimeout(timeout);
  }, [pathname]);

  // if (!loading) return <>{children}</>;

  return (
    <div className="relative">
      {/* Content is still there but slightly dimmed */}
      <div className={cn(loading ? "opacity-20" : "")}>{children}</div>

      {/* Loader Overlay */}
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-[#262930] bg-opacity-60 z-50">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default LoaderProvider;
