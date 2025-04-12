// components/LoaderProvider.tsx
"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "./loader/Loader";
import { LoadingContext } from "@/context/LoadingContext";

const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <LoadingContext.Provider value={{ loading }}>
      <div className="relative w-[100vw] overflow-x-hidden">
        <div className={cn(loading ? "opacity-20" : "")}>{children}</div>
        {loading && (
          <div className="fixed inset-0 flex justify-center items-center bg-[#262930] z-50">
            <Loader />
          </div>
        )}
      </div>
    </LoadingContext.Provider>
  );
};

export default LoaderProvider;
