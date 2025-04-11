"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";
import GenerateTicket from "@/components/GenerateTicket";

const ThankYouPage = () => {
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [uni, setUni] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setName(params.get("name"));
    setEmail(params.get("email"));
    setUni(params.get("uni"));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-8 rounded-lg shadow-md text-center flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Thank You!</h1>

        <Link
          href="/"
          className="w-[200px] mt-5 py-2 flex items-center justify-center bg-[#045a6d] text-white font-medium rounded-[15px] mr-2 hover:bg-[#036075] cursor-pointer"
        >
          <ArrowBigLeft className="w-5 h-5" />
          <span className="ml-2">Go Back to Home</span>
        </Link>

        {name && email && uni ? (
          <div className="mt-10">
            <GenerateTicket name={name} email={email} uni={uni} />
          </div>
        ) : (
          <p className="text-red-500 mt-6">Loading ticket info...</p>
        )}
      </div>
    </div>
  );
};

export default ThankYouPage;
